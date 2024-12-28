import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null; // Для першого варіанту
    // conn: mongoose.Connection | null; // Для другого варіанту
    promise: Promise<typeof mongoose> | null;
  };
}
