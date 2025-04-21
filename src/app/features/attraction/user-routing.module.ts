import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionPageComponent } from './pages/attraction-page/attraction-page.component';

const routes: Routes = [
    {
        path: '',
        component: AttractionPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AttractionRoutingModule { }