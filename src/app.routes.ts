import { Routes } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TaksModule } from "./tasks/tasks.module";


export const routes:Routes=
    [
        {
            path:'',
            module:AppModule,
            children:[
                {
                    path:'/user',
                    module:UserModule
                },
                {
                    path:'/auth',
                    module:AuthModule,
                },
                {
                    path:'/task',
                    module:TaksModule
                }

            ]
        }
    ]
