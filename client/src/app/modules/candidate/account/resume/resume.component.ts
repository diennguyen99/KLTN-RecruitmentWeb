import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

// dialog
import { AddEditSummaryDialogComponent } from "../components/add-edit-summary-dialog/add-edit-summary-dialog.component";
import { AddEditPortfolioDialogComponent } from "../components/add-edit-portfolio-dialog/add-edit-portfolio-dialog.component";
import { AddEditExperienceDialogComponent } from "../components/add-edit-experience-dialog/add-edit-experience-dialog.component";
import { AddEditEducationDialogComponent } from "../components/add-edit-education-dialog/add-edit-education-dialog.component";
import { AddEditSkillDialogComponent } from "../components/add-edit-skill-dialog/add-edit-skill-dialog.component";

// models
import { Profile } from "../models/profile.model";
import { Summary } from "../models/summary.model";
import { Portfolio } from "../models/portfolio.model";
import { Experience } from "../models/experience.model";
import { Education } from "../models/education.model";
import { Skill } from "../models/skill.model";

@Component({
  selector: 'app-resume',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {

  profileInfo$!: Observable<Profile>;
  summary$!: Observable<Summary>;
  portfolios$!: Observable<Portfolio[]>;
  experiences$!: Observable<Experience[]>;
  skills$!: Observable<Skill[]>;
  educations$!: Observable<Education[]>;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _store: Store<fromStore.AccountState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.loadPortfolios());
    this._store.dispatch(fromStore.loadExperiences());
    this._store.dispatch(fromStore.loadSkills());
    this._store.dispatch(fromStore.loadEducations());
    this._store.dispatch(fromStore.loadSummary());

    this.profileInfo$ = this._store.select(fromStore.getProfile);
    this.experiences$ = this._store.select(fromStore.getAllExperiences);
    this.skills$ = this._store.select(fromStore.getAllSkills);
    this.portfolios$ = this._store.select(fromStore.getAllPortfolios)
    this.educations$ = this._store.select(fromStore.getAllEducations);
    this.summary$ = this._store.select(fromStore.getSummary);
  }

  openAddEditSummaryDialog(summary: Summary = new Summary()) {
    this._dialog.open(AddEditSummaryDialogComponent, {
      width: '60%',
      data: summary
    });
  }

  openAddEditPortfolioDialog(portfolio: Portfolio = new Portfolio()) {
    this._dialog.open(AddEditPortfolioDialogComponent, {
      data: portfolio
    });
  }

  openAddEditExperienceDialog(experience: Experience = new Experience()) {
    this._dialog.open(AddEditExperienceDialogComponent, {
      data: experience
    });
  }

  openAddEditEducationDialog(education: Education = new Education()) {
    this._dialog.open(AddEditEducationDialogComponent, {
      data: education
    });
  }

  openAddEditSkillDialogComponent(skill: Skill = new Skill()) {
    this._dialog.open(AddEditSkillDialogComponent, {
      data: skill
    })
  }
}
