import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Log clerkClient structure
  console.log('clerkClient structure:', clerkClient);

  // Handle the webhook events
  switch (evt.type) {
    case 'user.created': {
      console.log('userId:', evt.data.id);
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address ?? '', // Якщо email може бути відсутнім
        username: username!, // Якщо username може бути null
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url,
      };

      const newUser = await createUser(user);

      if (newUser) {
        const client = await clerkClient(); // Викликаємо функцію
        console.log('client structure:', client); // Додайте для перевірки
        await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: 'OK', user: newUser });
    }
    case 'user.updated': {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name ?? '', // Замінюємо null на порожній рядок
        lastName: last_name ?? '', // Замінюємо null на порожній рядок
        username: username ?? '', // Замінюємо null на порожній рядок
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: 'OK', user: updatedUser });
    }
    case 'user.deleted': {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: 'OK', user: deletedUser });
    }
    default: {
      console.log(`Unhandled event type: ${evt.type}`);
      return new Response('Webhook received', { status: 200 });
    }
  }
}
