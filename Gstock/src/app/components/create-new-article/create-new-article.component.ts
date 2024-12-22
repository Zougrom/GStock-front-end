import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from 'src/app/commons/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create-new-article',
  templateUrl: './create-new-article.component.html',
  styleUrls: ['./create-new-article.component.css']
})
export class CreateNewArticleComponent implements OnInit {


  createArticleFormGroup!:FormGroup;

  constructor( private articleService: ArticleService, 
    private fb:FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.createArticleFormGroup=this.fb.group(
      {
        name:[''],
        initialStock:[''],
        securityStock:[''],
        unitOfMeasurement:['']
      }
    )
  }

  onSubmit(): void {
    if (this.createArticleFormGroup.valid) {
      const formValues: Article = this.createArticleFormGroup.value;
      this.articleService.addArticle(formValues).subscribe(
        response => {
          console.log('Article created successfully', response);
          alert("Article created with success")
          
        },
        error => {
          console.error('Error creating article', error);
          alert("Sorry there was an error");
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}


