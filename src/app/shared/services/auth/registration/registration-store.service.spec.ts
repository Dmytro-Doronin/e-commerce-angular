import { TestBed } from '@angular/core/testing'

import { RegistrationStoreService } from './registration-store.service'

describe('RegistrationStoreService', () => {
  let service: RegistrationStoreService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RegistrationStoreService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
