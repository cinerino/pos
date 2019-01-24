import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InquiryEffects, MasterEffects, PurchaseEffects, UserEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('App', reducer),
        EffectsModule.forFeature([InquiryEffects, PurchaseEffects, UserEffects, MasterEffects])
    ]
})
export class AppStoreModule { }
