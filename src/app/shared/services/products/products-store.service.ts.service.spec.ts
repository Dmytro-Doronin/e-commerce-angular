import { TestBed } from '@angular/core/testing'

import { ProductsStoreServiceTsService } from './products-store.service.ts.service'

describe('ProductsStoreServiceTsService', () => {
  let service: ProductsStoreServiceTsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductsStoreServiceTsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
