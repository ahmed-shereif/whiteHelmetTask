import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetSalesPageComponent } from './pages/pet-sales-page/pet-sales-page.component';

const routes: Routes = [
    {
        path: '',
        component: PetSalesPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PetSalesRoutingModule { }