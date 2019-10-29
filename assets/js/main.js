d3.csv("../data/dataset.csv").then(makeGraphs);

function makeGraphs(data) {
    var commitmentByProgrammeNameChart = dc.barChart('#commitment-by-programme-name');
    
    const ENDDATE_KEY = 'End Date';
    const STARTDATE_KEY = 'Start Date';
    const LEAD_APPLICATION_KEY = 'Lead Applicant';
    const PROGRAMME_NAME_KEY = 'Programme Name';
    const PROPOSA_NAME_KEY = 'Proposal ID';
    const RESERVED_BODY_KEY = 'Research Body';
    const RESEARCH_BODY_KEY = 'Research Body';
    const TOTAL_COMMITMENT_KEY = 'Revised Total Commitment (including overhead)';
    const RESEARCH_TITLE_KEY = 'Title of Research';

    var parseDate = d3.timeParse("%d/%m/%Y");
  
    data.forEach((d) => {
        d[ENDDATE_KEY] = parseDate(d[ENDDATE_KEY]);
        d[STARTDATE_KEY] = parseDate(d[STARTDATE_KEY]);
        d[TOTAL_COMMITMENT_KEY] = Number(d[TOTAL_COMMITMENT_KEY].replace(/[^0-9.-]+/g,""));
    });
    
    var ndx = crossfilter(data);
    var programmeDimension = ndx.dimension((d) => d[PROGRAMME_NAME_KEY]);
    var commitmentSumGroup = programmeDimension.group().reduceSum((d) => d[TOTAL_COMMITMENT_KEY]);
    
    console.log(commitmentSumGroup.all());
    
    commitmentByProgrammeNameChart
        .width(768)
        .height(480)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel(PROGRAMME_NAME_KEY)
        .yAxisLabel("Total Commitmemt")
        .dimension(programmeDimension)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(commitmentSumGroup)
    commitmentByProgrammeNameChart.render();
}
