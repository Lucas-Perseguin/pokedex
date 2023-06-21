//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';

//Components
import { HomeComponent } from './components/home/home.component';

//Services
import { PokemonsService } from 'src/app/services/pokemons.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule],
  providers: [PokemonsService],
})
export class HomeModule {}
