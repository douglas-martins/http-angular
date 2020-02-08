import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {BaseService} from '@esx-http/src/app/shared/base/base-service';
import {HttpClientModule} from '@angular/common/http';
import {BaseHttp} from '@esx-http/src/app/shared/base/base-http';
import {InterceptorModule} from '@esx-http/src/app/auth/interceptor/interceptor.module';
import {BaseMock} from '@esx-http/src/app/shared/base/base-mock';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InterceptorModule,
    HttpClientModule,
  ],
  providers: [BaseHttp, BaseService],
  bootstrap: [AppComponent]
})
export class ServicesModule { }

@NgModule({})
export class ServicesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [BaseHttp, BaseService, BaseMock]
    }
  }
}
