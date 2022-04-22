import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})

export class PopupFormComponent implements OnInit{
  title = 'appBootstrap';

  ngOnInit() {

  }
  closeResult: string;

  @Input() taskId : number = 0;
  updatedValue : string;
  currentTaskId : number;
  constructor(private modalService: NgbModal) {}

  @Output() notify = new EventEmitter<any[]>();

  emitItem: any[]=[];

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.updatedValue = '';
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(taskId,updateform:NgForm){
    this.currentTaskId = taskId;
    this.emitItem.push(this.currentTaskId);
    this.emitItem.push(this.updatedValue);
    this.notify.emit(this.emitItem);
    this.emitItem = [];
    this.updatedValue = '';
  }

}



