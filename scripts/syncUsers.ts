import { users, User } from '@clerk/clerk-sdk-node';
import { createUser } from '@/lib/actions/user.actions';

export async function syncAllUsersFromClerk() {
  try {
    console.log('Початок синхронізації користувачів...');

    // Отримання списку користувачів
    const clerkUsers: User[] = await users.getUserList();

    await Promise.all(
      clerkUsers.map(async (clerkUser: User) => {
        const user = {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          username: clerkUser.username || 'default-username',
          firstName: clerkUser.firstName || 'Name',
          lastName: clerkUser.lastName || 'LastName',
          photo: clerkUser.profileImageUrl || '',
        };
        await createUser(user);
      })
    );

    console.log('Синхронізація завершена');
  } catch (error) {
    console.error('Помилка синхронізації:', error);
  }
}

// Викликати цю функцію вручну для одноразової синхронізації
(async () => {
  await syncAllUsersFromClerk();
})();
