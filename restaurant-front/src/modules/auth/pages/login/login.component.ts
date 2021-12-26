import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Login } from "src/modules/shared/models/login";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  //TODO INTERCEPTORS

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {}

  submit() {
    const auth: Login = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(auth).subscribe(
      (result) => {
        this.toastr.success("Successful login!");
        localStorage.setItem("user", JSON.stringify(result));
        //TODO this.router.navigate(["/wine/list"]);
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
}
