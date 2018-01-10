//Modules
import { Component, OnInit, Inject, Input } from '@angular/core';

//Custom
import { SubgroupService } from '../services/subgroup.service'
// import { MessageService } from '../../sharedServices/message.service'
import { Subgroup } from '../classes/Subgroup'
import { ToastrModule, ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-subgroups',
  templateUrl: './subgroup-list.component.html'
})


export class SubgroupListComponent implements OnInit {

  subgroupList: Subgroup[];

  constructor(
    private subgroupService: SubgroupService,
    private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    this.getSubgroups();
  }

  getSubgroups(): void {
    this.subgroupService.getSubgroups().subscribe(subgroupList => {
      this.subgroupList = subgroupList;
      this.showSuccess();
    }
    );
  }


  deleteSubgroup(subgroup: Subgroup | Subgroup): void {

    if (confirm('آیا مایل به حذف زیرگروه هستید ؟') == false)
      return;

    this.subgroupList = this.subgroupList.filter(s => s !== subgroup);
    this.subgroupService.deleteSubgroup(subgroup).subscribe();
    this.deleteSuccess();
  }


  showSuccess() {
    this.toastr.success('بارگزاری زیرگروه ها با موفقیت انجام شد.', '', { progressBar: true }
    )
  }


  deleteSuccess() {
    this.toastr.warning('زیرگروه با موفقیت حذف شد.', '', { progressBar: true }
    )
  }


}