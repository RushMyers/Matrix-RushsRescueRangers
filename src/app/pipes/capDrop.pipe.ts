import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capDropPipe' })
export class CapDropPipe implements PipeTransform {
        transform(value:any) {
            if (value ) {
                // let individualWords = value.split(" ");
                // for(var i = 0; i < individualWords.length; i++) {
                // individualWords[i] = `<span class="firstLetter">${individualWords[i].charAt(0).toUpperCase()}</span>`
                //                      + individualWords[i].slice(1)}
                
                // return individualWords.join(' ');

                value = value.replace(
                    /R/g, '<span class="firstLetter">R</span>'
                )
              };
        }
    }
