import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppController } from "../Controllers/app.controller";
import { AppService } from "../Services/app.service";

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
