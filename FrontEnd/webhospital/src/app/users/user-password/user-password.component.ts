import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../user.service";
import { User } from "../../models/user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
ToastrService;
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-password",
  templateUrl: "./user-password.component.html",
  styleUrls: ["./user-password.component.css"]
})
export class UserPasswordComponent implements OnInit {
  user: any;
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

  ngOnInit() {
    this.getMyUser();
  }

  getMyUser() {
    this.usersService.getMyUser().subscribe((user: any) => {
      this.user = user;
      this.id = user._id;
    });
  }

  //User gets updated with PATCH method

  onPatchUser(form: NgForm) {
    const pass1 = form.value.newPass;
    const pass2 = form.value.newPass2;
    if (form.invalid || pass1 !== pass2) {
      this.toastr.error("Ocurrio un error", "Error");
      return;
    }

    const newPassData: any = {
      password: pass1
    };

    this.usersService.patchPassword(newPassData);
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
