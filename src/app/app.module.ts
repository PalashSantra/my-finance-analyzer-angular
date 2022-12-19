import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LockOutline, AlertOutline } from '@ant-design/icons-angular/icons';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TranEntryComponent } from './tran-entry/tran-entry.component';
import { TranListComponent } from './tran-list/tran-list.component';
import { TranTransferComponent } from './tran-transfer/tran-transfer.component';
import { LedgerEntryComponent } from './ledger-entry/ledger-entry.component';
import { LedgerBalanceDrawerComponent } from './ledger-balance-drawer/ledger-balance-drawer.component';
import { LedgerBalanceChartComponent } from './ledger-balance-chart/ledger-balance-chart.component';


const icons: IconDefinition[] = [ UserOutline, LockOutline, AlertOutline ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    TransactionComponent,
    TranEntryComponent,
    TranListComponent,
    TranTransferComponent,
    LedgerEntryComponent,
    LedgerBalanceDrawerComponent,
    LedgerBalanceChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule.forRoot(icons),
    NzCheckboxModule,
    NzInputModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzDropDownModule,
    NzSelectModule,
    NzSpinModule,
    NzMessageModule,
    NzDrawerModule,
    NzTableModule,
    NzToolTipModule
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
