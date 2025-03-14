import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import { httpInterceptorProviders } from './app/interceptor.provider'

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers, ...httpInterceptorProviders],
}).catch(err => console.error(err))
