import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr'


//Custom
import { SubgroupService } from '../services/subgroup.service';
import { Subgroup } from '../classes/Subgroup';



@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html'
})

export class SubgroupComponent implements OnInit {

  private subgroup: Subgroup;
  private subgroupForm: NgForm;

  visiblity = ['', 'فعال', 'غیرفعال']
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subgroupService: SubgroupService,
    private toastr: ToastrService

  ) { }


  ngOnInit(): void {
    this.getSubgroup();

    this.subgroup = new Subgroup();
    this.subgroup.id = 0;
    this.subgroup.groupId = 2;
    this.subgroup.visitCount = 100;
  }

  getSubgroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) return;

    this.subgroupService.getSubgroup(id)
      .subscribe(h => {
        this.subgroup = h;
        this.showSuccess();
      });

  }

  saveSubgroup(): void {

    // alert(this.subgroup.visitCount);

    if (this.subgroup.id == 0)
      this.subgroupService.createSubgroup(this.subgroup)
        .subscribe(() => this.goBack());
    else
      this.subgroupService.updateSubgroup(this.subgroup)
        .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

  showSuccess() {
    this.toastr.info('بارگزاری زیرگروه با موفقیت انجام شد.', ''
      ,
      {
        timeOut: 3000,
        progressBar: true,
        positionClass: "toast-top-right"
      }
    )
  }

  // getItems(){  
  //   let apiUrl = 'api/Items';  
  //   return this.http.get(apiUrl)  
  //              .map((res: Response) => {return res.json()  
  //   });  
  // } 

  onSubmit() {
    this.submitted = true;
  }


}
