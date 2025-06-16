import { db } from './index';
import { usersTable } from './schema';

async function seedUsers() {
  try {
    await db.insert(usersTable).values([
      {
        name: 'admin',
        age: 20,
        email: 'admin@example.com',
      },
      {
        name: 'user',
        age: 20,
        email: 'user@example.com',
      },
    ]);
    console.log('User table seeded successfully');
  } catch (error) {
    console.error('Error seeding user table:', error);
    process.exit(1);
  }
}

seedUsers();
