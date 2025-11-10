import { z } from 'zod';

const loginInput = z.object({
  account: z.string().min(1, '必填'),
  password: z.string().min(1, '必填'),
});

export { loginInput };
