import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SeekerService} from "../../../share/services/seeker.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Seeker} from "../../../share/models/seeker";

@Component({
  selector: 'app-seeker-details',
  templateUrl: './seeker-details.component.html',
  styleUrls: ['./seeker-details.component.css']
})
export class SeekerDetailsComponent implements OnInit {

  formUpdateSeeker!: FormGroup;
  currentSeeker!: Seeker;
  image: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private seekerService: SeekerService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formUpdateSeeker = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      gender: [''],
      birthday: [''],
      image: [null],
    })

    this.getCurrentSeeker()
  }

  getCurrentSeeker() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.seekerService.getCurrentSeeker(id).subscribe((res) => {
      this.formUpdateSeeker.patchValue(res);
      this.formUpdateSeeker.patchValue({name: res.user.name});
      this.currentSeeker = res;
      this.image = 'http://localhost:8000/storage/seeker/' + this.currentSeeker.image;
      console.log(res)
    });
  }

  uploadImage(event: any) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.formUpdateSeeker.patchValue({
      image: file
    });
  }

  updateSeeker() {
    const formData = new FormData();
    // @ts-ignore
    formData.append("name", this.formUpdateSeeker.get('name').value);
    // @ts-ignore
    formData.append("image", this.formUpdateSeeker.get('image').value);
    // @ts-ignore
    formData.append("address", this.formUpdateSeeker.get('address').value);
    // @ts-ignore
    formData.append("phone", this.formUpdateSeeker.get('phone').value);
    // @ts-ignore
    formData.append("gender", this.formUpdateSeeker.get('gender').value);
    // @ts-ignore
    formData.append("birthday", this.formUpdateSeeker.get('birthday').value);

    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.seekerService.updateSeeker(formData, id).subscribe((res) => {
      this.toastr.success(res.message);
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/seeker/' + id + '/details']);
      });
    }, (error) => {this.toastr.error(error.error.message)});
  }
}
