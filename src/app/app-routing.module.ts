//NgModules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app/app.component';
import { NavMenuComponent } from './navmenu/navmenu.component';

//Subgroups
import { SubgroupComponent } from './subgroups/subgroup/subgroup.component';
import { SubgroupListComponent } from './subgroups/subgroup-list/subgroup-list.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'subgroup', component: SubgroupListComponent },
    { path: 'subgroup/detail', component: SubgroupComponent },
    { path: 'subgroup/detail/:id', component: SubgroupComponent },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
