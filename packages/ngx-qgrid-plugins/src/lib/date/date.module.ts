import { NgModule } from '@angular/core';
import { DateDirective } from './date.directive';
import { DateMaskDirective } from './date-mask.directive';
import { DateService } from './date.service';

@NgModule({
	declarations: [
		DateDirective,
		DateMaskDirective,
	],
	exports: [
		DateDirective,
		DateMaskDirective
	],
	providers: [
		DateService,
	]
})
export class DateModule {
}
