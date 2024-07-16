import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';

export const baseRoute = 'api/v1';

const authRoute = {
  path: baseRoute,
  module: AuthModule,
};

const userRoute = {
  path: baseRoute,
  module: UserModule,
};

export const appRoutes = [
  authRoute, 
  userRoute,
];
