import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import 'nvd3';
declare let d3: any;

@Component({
    selector: 'app-continuous-machine',
    templateUrl: 'continuous-chain-machine.component.html',
    styleUrls: ['continuous-chain-machine.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContinuousChainMachineComponent implements OnInit {

    constructor() { }

    ngOnInit() {

      // create a SVG area to draw on
      var svg = d3.select("#graph01")
        .append("svg")
        .attr("width",580)
        .attr("height",370)
        .style("border", "solid 1px lightgrey")
        .style("padding", "10px");

      createNucleo([86,107,86,63], "nucleo1");
      createNucleo([194,107,86,63], "nucleo2");
      createNucleo([301,107,86,63], "nucleo3");
      createNucleo([408,107,86,63], "nucleo4");

      for(let i = 0; i<19; i++){
        createEspira(i, "a", "enr");
        createEspira(i, "b", "enr");
        createEspira(i, "c", "enr");
        createEspira(i, "d", "enr");
        createEspira(i, "e", "enr");
        createEspira(i, "f", "enr");
      }

      for(let i = 0; i<=22; i++){
        createBarramento(i, "enr");
      }

      // createEscova([123, 234, 344, 456], "escova");
      //21.6 entre paralelos

      //arranjo1
      for(let j = 0; j<=19; j++){
        createArranjo(j);
      }
      function createArranjo(k){
        svg = d3.select("#graph01 svg")
        .append("g")
        .classed("group", true)
        .attr("id", "group-1");
      createGroupEspira([1+k,4+k], "red");
      createGroupEspira([6+k,9+k], "blue");
      createGroupEspira([11+k,14+k], "red");
      createGroupEspira([16+k,19+k], "blue");

      function createGroupEspira(limit, classe){
        for(let i = limit[0]; i<=limit[1]; i++){
          createEspira(i, "c", classe);
          createEspira(i, "b", classe);
          createEspira(i, "a", classe);
          createEspira(i+1, "f", classe);
          createEspira(i+1, "d", classe);
          createEspira(i+1, "e", classe);
        }
      }

      createEscova(k,"escova");
      createBarramento(3+k, "null");
    }


      function createEscova(position, classe){
        let place = [];
        position = position % 20;
        let offsetEscova = Math.round(21.6*1);
        place[0] = 120 - offsetEscova + Math.round(21.6 * position + offsetEscova)%Math.round(444);
        place[1] = 120 - offsetEscova + Math.round(21.6 * position + 111 + offsetEscova)%Math.round(444);
        place[2] = 120 - offsetEscova + Math.round(21.6 * position + 221 + offsetEscova)%Math.round(444);
        place[3] = 120 - offsetEscova + Math.round(21.6 * position + 333 + offsetEscova)%Math.round(444);
        let offset = [0, 0, 0, 0], objeto;
        let offsetDic = {
          a1: [place[0],270,34,23],
          b1: [place[1],270,34,23],
          a2: [place[2],270,34,23],
          b2: [place[3],270,34,23],
          la1: [place[0]+17, 293, place[0]+17, 329],
          la2: [place[0]+17, 329, place[2]+17, 329],
          la3: [place[2]+17, 293, place[2]+17, 329],
          la4: [(place[0]+place[2])/2, 329, (place[0]+place[2])/2, 350],
          lb1: [place[1]+17, 293, place[1]+17, 311],
          lb2: [place[1]+17, 311, place[3]+17, 311],
          lb3: [place[1]+17, 293, place[1]+17, 311],
          lb4: [place[3]+17, 293, place[3]+17, 350],
        }
        let styleDic = {
          a1: "escova-p",
          a2: "escova-p",
          b1: "escova-n",
          b2: "escova-n",
          la1: "p",
          la2: "p",
          la3: "p",
          la4: "p",
          lb1: "n",
          lb2: "n",
          lb3: "n",
          lb4: "n",
        }

        // place = Math.round(place * 21.6);
        createContato("a1");
        createContato("a2");
        createContato("b1");
        createContato("b2");

        createLigacao("la1");
        createLigacao("la2");
        createLigacao("la3");
        createLigacao("la4");

        createLigacao("lb1");
        createLigacao("lb2");
        createLigacao("lb3");
        createLigacao("lb4");

        function createContato(type){
          let offset = offsetDic[type];
          let style = styleDic[type];
          var rect = svg.append("rect")
            .attr("x", offset[0])
            .attr("y", offset[1])
            .attr("width", offset[2])
            .attr("height", offset[3])
            .classed(style, true);
        }

        function createLigacao(type){
          let offset = offsetDic[type];
          let style = styleDic[type];
          var rect = svg.append("line")
            .attr("x1", offset[0])
            .attr("y1", offset[1])
            .attr("x2", offset[2])
            .attr("y2", offset[3])
            .classed(style, true);
        }

        return objeto;
      }

      function createEspira(place0, type, classe){
        let offset = [0, 0, 0, 0], objeto, place;
        let offsetDic = {
          a: [127, 30, 80, 86],
          b: [80, 86, 80, 195],
          c: [80, 195, 133, 248],
          d: [133, 248, 155, 196],
          e: [155, 196, 155, 86],
          f: [155, 86, 106, 30],
        }
        let StyleDic = {
          a: "enr1",
          b: "enr1",
          c: "enr1",
          d: "enr2",
          e: "enr2",
          f: "enr2",
        }
        let limitDic = {
          a: [0,20],
          b: [0,20],
          c: [-4,20],
          d: [-4,19],
          e: [-4,16],
          f: [-4,16],
        }

        create(place0%20);
        create(place0%20+20);
        create(place0%20-20);
        function create(place0){
          if((limitDic[type][0]>place0)||limitDic[type][1]<place0){
            return;
          }
          if(offsetDic[type]){
            offset = offsetDic[type]
          }

          place = Math.round(place0 * 21.6);

          objeto =  svg.append("line")
            .classed(classe, true)
            .classed("esp-"+type+place0, true)
            .attr("x1", place + offset[0])
            .attr("y1", offset[1])
            .attr("x2", place + offset[2])
            .attr("y2", offset[3]);

          if(StyleDic[type]){
            objeto.classed(StyleDic[type], true);
          }
        }
      }

      function createNucleo(offset, classe){
        return svg.append("rect")
          .attr("x", offset[0])
          .attr("y", offset[1])
          .attr("width", offset[2])
          .attr("height", offset[3])
          .attr("class", classe);
      }

      function createBarramento(offset, classe){
        let aux = 56;
        aux = Math.round(aux + offset*21.6);
        return svg.append("rect")
          .attr("x", aux)
          .attr("y", 248)
          .attr("width", 23)
          .attr("height", 23)
          .classed(classe, true)
          .classed("barramento", true)
          .classed("bar-"+offset, true);
      }


  }

}
