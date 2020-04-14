import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../user.service";
import { User } from "../../models/user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  user: User;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectUser: string;
  id: string;

  constructor(
    private router: ActivatedRoute,
    private usersService: UsersService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  getMyUser() {
    this.usersService.getMyUser().subscribe((data: User) => {
      this.user = data;
      console.log(this.user);
    });
  }

  //User gets updated with PATCH method
  patchUser() {
    this.edit = !this.edit;
  }

  onPatchUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshuser: User = {
      name: form.value.name,
      last_name: form.value.last_name,
      email: form.value.email,
      password: form.value.password
    };

    this.usersService.patchUser(freshuser, this.id);
  }
  onRemoveUser(status: boolean) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      maxWidth: "600px",
      data: {
        title: "Eliminar Usuario",
        message: "¿Esta Seguro Que Desea Eliminar el Usuario?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        //if User pressed Yes
        this.usersService.removeUser(this.id);
        return;
      }
    });
  }
}
