import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [
     MatInputModule,
     MatButtonModule,
     MatToolbarModule,
     MatCardModule,
     MatSidenavModule,
     MatDialogModule,
     MatFormFieldModule,
     MatIconModule,
     MatListModule,
     MatMenuModule,
     MatBadgeModule,
     MatTooltipModule,

  ],
})
export class MaterialModule {}

