import { users, User } from '@clerk/clerk-sdk-node';
import { createUser } from '@/lib/actions/user.actions';

export async function syncAllUsersFromClerk() {
  try {
    console.log('Початок синхронізації користувачів...');

    // Отримання списку користувачів
    const clerkUsers: User[] = await users.getUserList();

    if (clerkUsers.length === 0) {
      console.log('Немає користувачів для синхронізації.');
      return;
    }

    // Поділ користувачів на батчі (наприклад, по 10 користувачів)
    const batchSize = 10;
    for (let i = 0; i < clerkUsers.length; i += batchSize) {
      const batch = clerkUsers.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (clerkUser: User) => {
          try {
            const user = {
              clerkId: clerkUser.id,
              email: clerkUser.emailAddresses?.[0]?.emailAddress || 'no-email',
              username: clerkUser.username || `user-${clerkUser.id}`, // Генерація унікального username
              firstName: clerkUser.firstName || 'FirstName',
              lastName: clerkUser.lastName || 'LastName',
              photo: clerkUser.profileImageUrl || '',
            };

            console.log('Синхронізація користувача:', user);
            await createUser(user);
          } catch (error) {
            console.error(`Помилка при синхронізації користувача ${clerkUser.id}:`, error);
          }
        })
      );
    }

    console.log('Синхронізація завершена');
  } catch (error: any) {
    console.error('Помилка синхронізації:', error.message || error);
  }
}

// Викликати цю функцію вручну для одноразової синхронізації
(async () => {
  await syncAllUsersFromClerk();
})();
