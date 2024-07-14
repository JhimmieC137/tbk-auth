import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';
// import { NinjasModule } from 'src/modules/ninjas/ninjas.module';
// import { PhonesModule } from 'src/modules/phones/phones.module';

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
