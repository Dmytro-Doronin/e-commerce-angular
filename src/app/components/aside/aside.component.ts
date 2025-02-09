import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  private readonly navigationViewport = viewChild.required('navigationView', {
    read: ViewContainerRef,
  })

  private readonly contentViewport = viewChild.required('contentView', {
    read: ViewContainerRef,
  })

  readonly navigationTemplate = input<TemplateRef<unknown>>()
  readonly contentTemplate = input<TemplateRef<unknown>>()

  constructor() {
    effect(() => {
      const navigationTemplate = this.navigationTemplate()

      if (navigationTemplate) {
        this.navigationViewport().createEmbeddedView(navigationTemplate)
      }
    })

    effect(() => {
      const contentTemplate = this.contentTemplate()

      if (contentTemplate) {
        this.contentViewport().createEmbeddedView(contentTemplate)
      }
    })
  }
}
