//NgModules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr'

//Modules
import { AppRoutingModule } from './app-routing.module';

//Services
import { MessageService } from '../sharedServices/message.service';
import { SubgroupService } from './subgroups/services/subgroup.service';

//Components
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app/app.component';
import { NavMenuComponent } from './navmenu/navmenu.component';


//Subgroups
import { SubgroupListComponent } from './subgroups/subgroup-list/subgroup-list.component';
import { SubgroupComponent } from './subgroups/subgroup/subgroup.component';
import { GroupsComponent } from './groups/groups.component';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    NavMenuComponent,
    SubgroupListComponent,
    SubgroupComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],

  providers: [MessageService, SubgroupService],
  bootstrap: [AppComponent]
})

export class AppModule {
}