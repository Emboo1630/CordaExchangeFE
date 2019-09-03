import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../_services/my-service.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  myIdentity: string = "";
  peers: any = [];
  showSpinner: boolean = false;
  constructor(
    private MyServiceService: MyServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.showSpinner = false;
    this.getOwnerNodeParty();
    this.getPeers();

  }

  getOwnerNodeParty() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getOwnerNode().subscribe(res => {
      if (res.status === 'success') {
        this.spinner.hide();
        this.myIdentity = res.result
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getPeers() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getPeers().subscribe(
      res => {
        if (res.status === 'success') {
          this.spinner.hide();
          for (let per of res.result) {
            if (per === 'Notary') {
            } else if (per === this.myIdentity) {
            } else {
              this.peers.push(per)
            }
          }
          console.log(this.peers)
        }
      }, err => {
        console.log(err)
      }
    )
}
}
