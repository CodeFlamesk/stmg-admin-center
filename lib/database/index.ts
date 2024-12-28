import mongoose from 'mongoose';

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Декларація глобальної змінної для зберігання кешу
declare global {
  var mongoose: MongooseCache | undefined;
}

// Ініціалізація кешу
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  // Якщо є існуюче підключення, повертаємо його
  if (cached.conn) {
    return cached.conn;
  }

  // Перевірка, чи є MONGODB_URI у змінних середовища
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  // Якщо promise ще не існує, створюємо його
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: 'stmg',
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  // Очікуємо результат promise і зберігаємо підключення
  cached.conn = await cached.promise;
  return cached.conn;
};
