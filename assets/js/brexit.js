d3.csv("../data/census.csv").then(makeGraphs);

function makeGraphs(data) {
    var chart = dc.barChart('#brexit-census');
    
    const ENDDATE_KEY = 'End Date';
    const STARTDATE_KEY = 'Start Date';
    const LEAD_APPLICATION_KEY = 'Lead Applicant';
    const PROGRAMME_NAME_KEY = 'Programme Name';
    const PROPOSA_NAME_KEY = 'Proposal ID';
    const RESERVED_BODY_KEY = 'Research Body';
    const RESEARCH_BODY_KEY = 'Research Body';
    const TOTAL_COMMITMENT_KEY = 'Revised Total Commitment (including overhead)';
    const RESEARCH_TITLE_KEY = 'Title of Research';

    const TYPE = 'Type';
    const CODE = 'Code';
    const AREA = 'Area';
    const ALL_RESIDENTS = 'All Residents';
    const GROUP_1 = 'Age 0 to 4';
    const GROUP_2 = 'Age 5 to 9';
    const GROUP_3 = 'Age 10 to 14';
    const GROUP_4 = 'Age 15 to 19';
    const GROUP_5 = 'Age 19 to 24';
    const GROUP_6 = 'Age 25 to 29';

    var parseDate = d3.timeParse("%d/%m/%Y");
  
    data.forEach((d) => {
        d[GROUP_1] = +d[GROUP_1];
        d[GROUP_2] = +d[GROUP_2];
        d[GROUP_3] = +d[GROUP_3];
        d[GROUP_4] = +d[GROUP_4];
        d[GROUP_5] = +d[GROUP_5];
        d[GROUP_6] = +d[GROUP_6];
    });

    var ndx = crossfilter(data);
    var areaDimension = ndx.dimension((d) => d[TYPE]);
    var group1SumGroup = areaDimension.group().reduceSum((d) => d[GROUP_1]);
    
    console.log(group1SumGroup.all());
    
    chart
        .width(768)
        .height(480)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel(AREA)
        .yAxisLabel("Total Commitmemt")
        .dimension(areaDimension)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(group1SumGroup)
    chart.render();
}
