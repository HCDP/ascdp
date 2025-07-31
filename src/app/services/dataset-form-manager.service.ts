import { Injectable } from '@angular/core';
import moment, { Moment } from "moment-timezone";
import { StringMap } from '../models/types';
import { DateManagerService } from './dateManager/date-manager.service';
import { RequestFactoryService } from './requests/request-factory.service';
import { RequestResults } from './requests/request.service';


@Injectable({
  providedIn: 'root'
})
export class DatasetFormManagerService {
  private _visFormManager: FormManager<VisDatasetItem>;
  private _exportFormManager: FormManager<ExportDatasetItem>;

  constructor(private dateHandler: DateManagerService, private requestFactory: RequestFactoryService) {
    this.setupDatasets();
  }

  ////////////// set up datasets ///////////////////
  private setupDatasets() {
    //set up form data
    ////values
    //////period
    let periodDay = new FormValue(new DisplayData("Data measured at a daily time scale.", "Daily", "day"), {period: "day"}, [true, true]);
    //Climatology mean type
    let meanMonthly = new FormValue(new DisplayData("Mean monthly maps", "Mean Monthly", "mean_monthly"), {mean_type: "mean_monthly"}, [true, true]);
    let meanAnnual30 = new FormValue(new DisplayData("Annual maps averaged over a 30 year period", "Mean 30 Year Annual", "mean_30yr_annual"), {mean_type: "mean_30yr_annual"}, [true, true]);
    //Climatology period
    let periodJanuaryPrism = new FormValue(new DisplayData("Average values aggregated over the month of January over the years 1971-2000", "January", "january"), {period: "january"}, [true, true]);
    let periodFebruaryPrism = new FormValue(new DisplayData("Average values aggregated over the month of February over the years 1971-2000", "February", "february"), {period: "february"}, [true, true]);
    let periodMarchPrism = new FormValue(new DisplayData("Average values aggregated over the month of March over the years 1971-2000", "March", "march"), {period: "march"}, [true, true]);
    let periodAprilPrism = new FormValue(new DisplayData("Average values aggregated over the month of April over the years 1971-2000", "April", "april"), {period: "april"}, [true, true]);
    let periodMayPrism = new FormValue(new DisplayData("Average values aggregated over the month of May over the years 1971-2000", "May", "may"), {period: "may"}, [true, true]);
    let periodJunePrism = new FormValue(new DisplayData("Average values aggregated over the month of June over the years 1971-2000", "June", "june"), {period: "june"}, [true, true]);
    let periodJulyPrism = new FormValue(new DisplayData("Average values aggregated over the month of July over the years 1971-2000", "July", "july"), {period: "july"}, [true, true]);
    let periodAugustPrism = new FormValue(new DisplayData("Average values aggregated over the month of August over the years 1971-2000", "August", "august"), {period: "august"}, [true, true]);
    let periodSeptemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of September over the years 1971-2000", "September", "september"), {period: "september"}, [true, true]);
    let periodOctoberPrism = new FormValue(new DisplayData("Average values aggregated over the month of October over the years 1971-2000", "October", "october"), {period: "october"}, [true, true]);
    let periodNovemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of November over the years 1971-2000", "November", "november"), {period: "november"}, [true, true]);
    let periodDecemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of December over the years 1971-2000", "December", "december"), {period: "december"}, [true, true]);

    let period30yrPrism = new FormValue(new DisplayData("30 year climatology averaged over the years 1971-2000", "1971-2000", "1971-2000"), {period: "1971-2000"}, [true, true]);



    ////values
   
    //////units
    let mmUnits = new FormValue(new DisplayData("Values in millimeters", "mm", "mm"), {
      units: "mm"
    }, null);
   



    let periodNode = new FormNode(new DisplayData("The time period over which the data is measured.", "Time Period", "period"), [
      periodDay
    ]);
    let prismClimatologyMeanTypeNode = new FormNode(new DisplayData("The type of data aggregation", "Mean Type", "mean_type"), [
      meanMonthly,
      meanAnnual30
    ]);

    let prismClimatologyPeriodNode = new FormNode(new DisplayData("The time period over which station data were averaged to create the map", "Data Period", "cl_mean"), [
      periodJanuaryPrism,
      periodFebruaryPrism,
      periodMarchPrism,
      periodAprilPrism,
      periodMayPrism,
      periodJunePrism,
      periodJulyPrism,
      periodAugustPrism,
      periodSeptemberPrism,
      periodOctoberPrism,
      periodNovemberPrism,
      periodDecemberPrism,
      period30yrPrism
    ]);


    let unitsDisplayData = new DisplayData("The units the data are represented in.", "Units", "units");

    let rfUnitsNode = new FormNode(unitsDisplayData, [mmUnits]);


    ////form data
    //rainfall
    let rainfallFormData = new FormData([
      periodNode
    ], []);
    //climatologies
    let prismClimatologyFormData = new FormData([
      prismClimatologyMeanTypeNode,
      prismClimatologyPeriodNode
    ], []);
    let prismClimatologyExportFormData = new FormData([
      prismClimatologyMeanTypeNode
    ], []);


    //Create Focus Managers
    ////dates

    ////periods
    let monthPeriod = new PeriodData("month", 1, "month");
    let dayPeriod = new PeriodData("day", 1, "day");
    ////focus managers
    let rainfallDayTimeseriesData = new TimeseriesData(dayPeriod, monthPeriod, this.dateHandler);


    let rainfallDay = new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", "Daily Rainfall", [0, 20], [true, false], rainfallDayTimeseriesData, [rainfallDayTimeseriesData], false, {
      period: "day",
    }, null, this.requestFactory);
    //climatologies
    let prismRainfallClimatologySets = [];
    let prismMaxTemperatureClimatologySets = [];
    let prismMinTemperatureClimatologySets = [];
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    for(let month of months) {
      let capMonth = month.charAt(0).toUpperCase() + month.slice(1);
      let prismRainfallClimatology = new VisDatasetItem(false, true, "Inches", "in", "Rainfall", `${capMonth} Mean Rainfall`, [0, 30], [true, false], null, [], false, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      prismRainfallClimatologySets.push(prismRainfallClimatology);
      let prismMaxTemperatureClimatology = new VisDatasetItem(false, true, "Fahrenheit", "°F", "Maximum Temperature", `${capMonth} Maximum Temperature`, [75, 90], [false, false], null, [], true, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      let prismMinTemperatureClimatology = new VisDatasetItem(false, true, "Fahrenheit", "°F", "Minimum Temperature", `${capMonth} Minimum Temperature`, [75, 90], [false, false], null, [], true, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      prismMaxTemperatureClimatologySets.push(prismMaxTemperatureClimatology);
      prismMinTemperatureClimatologySets.push(prismMinTemperatureClimatology);
    }

    let prismRainfallClimatology = new VisDatasetItem(false, true, "Inches", "in", "Rainfall", `1971-2000 Mean Rainfall`, [0, 400], [true, false], null, [], false, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    prismRainfallClimatologySets.push(prismRainfallClimatology);
    let prismMaxTemperatureClimatology = new VisDatasetItem(false, true, "Fahrenheit", "°F", "Maximum Temperature", `1971-2000 Maximum Temperature`, [75, 90], [false, false], null, [], true, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    let prismMinTemperatureClimatology = new VisDatasetItem(false, true, "Fahrenheit", "°F", "Minimum Temperature", `1971-2000 Minimum Temperature`, [75, 90], [false, false], null, [], true, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    prismMaxTemperatureClimatologySets.push(prismMaxTemperatureClimatology);
    prismMinTemperatureClimatologySets.push(prismMinTemperatureClimatology);

 
 
    ////Datasets

    //rainfall
    let rainfallDatasetDisplayData = new DisplayData("Rainfall data (1980 - 2024).", "Rainfall", "rainfall");

    let rainfallVisDataset = new Dataset<VisDatasetItem>(rainfallDatasetDisplayData, {
      location: "american_samoa",
      datatype: "rainfall"
    }, rainfallFormData, [
      rainfallDay
    ]);

    //climatologies
    let prismClimatologyRainfallDatasetDisplayData = new DisplayData("Mean rainfall climatologies", "Mean Rainfall", "prism_mean_rf_climatology");
    let prismClimatologyMinTemperatureDatasetDisplayData = new DisplayData("Minimum air temperature climatologies", "Minimum Air Temperature", "prism_min_temp_climatology");
    let prismClimatologyMaxTemperatureDatasetDisplayData = new DisplayData("Maximum air temperature climatologies", "Maximum Air Temperature", "prism_max_temp_climatology");

    let prismRainfallClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyRainfallDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "rainfall"
    }, prismClimatologyFormData, prismRainfallClimatologySets);
    let prismMaxTemperatureClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyMaxTemperatureDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "max"
    }, prismClimatologyFormData, prismMaxTemperatureClimatologySets);
    let prismMinTemperatureClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyMinTemperatureDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "min"
    }, prismClimatologyFormData, prismMinTemperatureClimatologySets);




    //////////////////////////////////////////////////////////////////////
    /////////////////////////////// export ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    //filetypes
    let geotiffFtype = new FileType("GeoTIFF", "tif", "GeoTIFF files are a variant of the TIFF file format which is used to store raster based data/graphics including georeferencing information.");
    let txtFtype = new FileType("Text", "txt", "A plaintext file.");
    //file display data
    let rainfallMapDisplayData = new DisplayData("A gridded rainfall map representing estimated rainfall values over American Samoa.", "Rainfall Map", "data_map");
    let metadataDisplayData = new DisplayData("Gridded map product metadata and error metrics.", "Metadata and Error Metrics", "metadata");
    let climatologyRainfallMapDisplayData = new DisplayData("A gridded map displaying the average estimated rainfall over the selected time period.", "Rainfall Map", "data_map");
    let climatologyTemperatureMapDisplayData = new DisplayData("A gridded map displaying the average estimated mean temperature over the selected time period.", "Temperature Map", "data_map");

    ////nodes

    //fileProperties
    let rfMmUnitsProperty = new FileProperty(rfUnitsNode.filter(["mm"]), ["mm"]);
    let monthPrismClimatologyProperty = new FileProperty(prismClimatologyPeriodNode.filter(["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]), ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]);
    let yr30PrismClimatologyProperty = new FileProperty(prismClimatologyPeriodNode.filter(["1971-2000"]), ["1971-2000"]);


    //package files
    let rainfallMapFile = new FileData(rainfallMapDisplayData, geotiffFtype, ["metadata"]);
    let prismClimatologyRainfallMapFile = new FileData(climatologyRainfallMapDisplayData, geotiffFtype, []);
    let prismClimatologyTemperatureMapFile = new FileData(climatologyTemperatureMapDisplayData, geotiffFtype, []);
    let metadataFile = new FileData(metadataDisplayData, txtFtype, []);



    let rainfallDayMapFileGroup = new FileGroup(new DisplayData("", "", "a"), [rainfallMapFile, metadataFile], [rfMmUnitsProperty]);
    let prismClimatologyRainfallMonthFileGroup = new FileGroup(new DisplayData("", "", "b"), [prismClimatologyRainfallMapFile], [monthPrismClimatologyProperty]);
    let prismClimatologyRainfall30yrFileGroup = new FileGroup(new DisplayData("", "", "c"), [prismClimatologyRainfallMapFile], [yr30PrismClimatologyProperty]);
    let prismClimatologyTemperatureMonthFileGroup = new FileGroup(new DisplayData("", "", "d"), [prismClimatologyTemperatureMapFile], [monthPrismClimatologyProperty]);
    let prismClimatologyTemperature30yrFileGroup = new FileGroup(new DisplayData("", "", "e"), [prismClimatologyTemperatureMapFile], [yr30PrismClimatologyProperty]);

    //export items
    ////rainfall
    let rainfallDayExportItem = new ExportDatasetItem([rainfallDayMapFileGroup], {
      period: "day"
    }, "Daily Rainfall", rainfallDayTimeseriesData, this.requestFactory);
    let prismClimatologyRainfallMonthExportItem = new ExportDatasetItem([prismClimatologyRainfallMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Rainfall Climatologies", null, this.requestFactory);
    let prismClimatologyRainfall30yrExportItem = new ExportDatasetItem([prismClimatologyRainfall30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Rainfall Climatologies", null, this.requestFactory);


    let prismClimatologyMaxTemperatureMonthExportItem = new ExportDatasetItem([prismClimatologyTemperatureMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Maximum Temperature Climatologies", null, this.requestFactory);
    let prismClimatologyMaxTemperature30yrExportItem = new ExportDatasetItem([prismClimatologyTemperature30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Maximum Temperature Climatologies", null, this.requestFactory);

    let prismClimatologyMinTemperatureMonthExportItem = new ExportDatasetItem([prismClimatologyTemperatureMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Minimum Temperature Climatologies", null, this.requestFactory);
    let prismClimatologyMinTemperature30yrExportItem = new ExportDatasetItem([prismClimatologyTemperature30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Minimum Temperature Climatologies", null, this.requestFactory);


    ////Datasets
    let rainfallExportDataset = new Dataset<ExportDatasetItem>(rainfallDatasetDisplayData, {
      location: "american_samoa",
      datatype: "rainfall"
    }, rainfallFormData, [
      rainfallDayExportItem
    ]);

    let prismClimatologyRainfallExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyRainfallDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "rainfall"
    }, prismClimatologyExportFormData, [
      prismClimatologyRainfallMonthExportItem,
      prismClimatologyRainfall30yrExportItem
    ]);
    let prismClimatologyMaxTemperatureExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyMaxTemperatureDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "max"
    }, prismClimatologyExportFormData, [
      prismClimatologyMaxTemperatureMonthExportItem,
      prismClimatologyMaxTemperature30yrExportItem
    ]);
    let prismClimatologyMinTemperatureExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyMinTemperatureDatasetDisplayData, {
      location: "american_samoa",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "min"
    }, prismClimatologyExportFormData, [
      prismClimatologyMinTemperatureMonthExportItem,
      prismClimatologyMinTemperature30yrExportItem
    ]);



    ///////////////////////////////////////////////////////////////////
    ///////////// Create Dataset Groups and Form Managers /////////////
    ///////////////////////////////////////////////////////////////////
    let prismClimatologyGrouperDisplayData = new DisplayData("PRISM climatologies.", "PRISM Climatology", "prism_climatology");

    let datasetFormDisplayData = new DisplayData("Select the type of data you would like to view. Hover over an option for a description of the dataset.", "Dataset", "dataset");
    //vis dataset groups
    let visDatasets = [rainfallVisDataset, prismRainfallClimatologyVisDataset, prismMaxTemperatureClimatologyVisDataset, prismMinTemperatureClimatologyVisDataset];
    let visDatasetSingles: Dataset<VisDatasetItem>[] = [rainfallVisDataset];
    let visDatasetGroupers: DatasetSelectorGroup[] = [
      new DatasetSelectorGroup(prismClimatologyGrouperDisplayData, [prismRainfallClimatologyVisDataset, prismMaxTemperatureClimatologyVisDataset, prismMinTemperatureClimatologyVisDataset]),
    ];
    let visDatasetFormData = new DatasetFormData(datasetFormDisplayData, visDatasetSingles, visDatasetGroupers);

    //export dataset groups
    let exportDatasets = [rainfallExportDataset, prismClimatologyRainfallExportDataset, prismClimatologyMaxTemperatureExportDataset, prismClimatologyMinTemperatureExportDataset];
    let exportDatasetSingles: Dataset<ExportDatasetItem>[] = [rainfallExportDataset];
    let exportDatasetGroupers: DatasetSelectorGroup[] = [
      new DatasetSelectorGroup(prismClimatologyGrouperDisplayData, [prismClimatologyRainfallExportDataset, prismClimatologyMaxTemperatureExportDataset, prismClimatologyMinTemperatureExportDataset]),
    ];
    let exportDatasetFormData = new DatasetFormData(datasetFormDisplayData, exportDatasetSingles, exportDatasetGroupers);

    //default values for each node
    let defaultVisState = {
      datatype: "rainfall",
      period: "day"
    };
    let defaultExportState = {
      datatype: "rainfall",
      period: "day"
    };
    //create form managers
    this._visFormManager = new FormManager(visDatasets, visDatasetFormData, defaultVisState);
    this._exportFormManager = new FormManager(exportDatasets, exportDatasetFormData, defaultExportState);
  }

  get visFormManager(): FormManager<VisDatasetItem> {
    return this._visFormManager;
  }

  get exportFormManager(): FormManager<ExportDatasetItem> {
    return this._exportFormManager;
  }
}









































































export type ActiveFormData<T extends DatasetItem> = {
  datasetFormData: DatasetFormData,
  datasetItem: T,
  values: StringMap
}


export class DatasetFormData {
  private _displayData: DisplayData;
  private _datasetValues: FormValue[];
  private _groupers: DatasetSelectorGroup[];

  constructor(displayData: DisplayData, datasets: Dataset<DatasetItem>[], datasetGroups: DatasetSelectorGroup[]) {
    this._displayData = displayData;
    this._datasetValues = datasets.map((dataset: Dataset<DatasetItem>) => {
      return new FormValue(dataset.displayData, dataset.paramData, [true, true]);
    });
    this._groupers = datasetGroups;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get datasetValues(): FormValue[] {
    return this._datasetValues;
  }

  get datasetGroups(): DatasetSelectorGroup[] {
    return this._groupers;
  }
}

export class DatasetSelectorGroup {
  private _displayData: DisplayData;
  private _values: DisplayData[];

  constructor(displayData: DisplayData, datasets: Dataset<DatasetItem>[]) {
    this._values = datasets.map((dataset: Dataset<DatasetItem>) => {
      return dataset.displayData;
    });
    this._displayData = displayData;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get values(): DisplayData[] {
    return this._values;
  }
}

export class FormData {
  private _default: FormNode[];
  private _categorized: FormCategory[];

  constructor(defaultNodes: FormNode[], categorizedNodes: FormCategory[]) {
    this._default = defaultNodes;
    this._categorized = categorizedNodes;
  }

  get default(): FormNode[] {
    return this._default;
  }

  get categorized(): FormCategory[] {
    return this._categorized;
  }

  private filterNodes(values: any, nodes: FormNode[]) {
    return nodes.map((node: FormNode) => {
      let tag = node.tag;
      let valueTags = values[tag];
      if(!Array.isArray(valueTags)) {
        valueTags = [valueTags];
      }
      return node.filter(valueTags);
    });
  }

  public filter(values: any): FormData {
    let filteredDefault = this.filterNodes(values, this._default);
    let filteredCategorized = this._categorized.map((category: FormCategory) => {
      let nodes = this.filterNodes(values, category.nodes);
      return new FormCategory(category.displayData, nodes);
    });
    return new FormData(filteredDefault, filteredCategorized);
  }

  public flatten(): FormNode[] {
    let nodes = [...this._default];
    for(let category of this._categorized) {
      nodes = nodes.concat(category.nodes);
    }
    return nodes;
  }
}


//each dataset has a specific set of fields, define the entire set of fields and values, specific items can have subsets that are valid for it (all descriptions etc must be the same)
//dataset fields can be bound together by using the same tags
//each individual item will just have a tag map
//what properties are dataset specific?
class Dataset<T extends DatasetItem> {
  private _displayData: DisplayData;
  private _formData: FormData;
  private _fields: string[];
  private _itemMap: any;
  private _paramData: StringMap;

  constructor(displayData: DisplayData, paramData: StringMap, formData: FormData, items: T[]) {
    this._fields = [];
    for(let node of formData.default) {
      this._fields.push(node.tag);
    }
    for(let category of formData.categorized) {
      for(let node of category.nodes) {
        this._fields.push(node.tag);
      }
    }
    this._formData = formData;
    this._displayData = displayData;
    this._paramData = paramData;
    this._itemMap = {};
    for(let item of items) {
      this.addItem(item);
    }
  }

  private addItem(item: T) {
    item.dataset = this;
    let values = item.values;
    let tree = this._itemMap;
    let i: number;
    for(i = 0; i < this._fields.length - 1; i++) {
      let field = this._fields[i];
      let value = values[field];
      let next = tree[value];
      if(next === undefined) {
        next = {};
        tree[value] = next;
      }
      tree = next;
    }
    //leaf node should ne the dataset item
    let field = this._fields[i];
    let value = values[field];
    tree[value] = item;
  }

  get formData(): FormData {
    return this._formData;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get paramData(): StringMap {
    return this._paramData;
  }

  public getStateData(state: StringMap): StateData<T> {
    //retrieve corrected state, the dataset item associated with it, and form data
    let correctedState = Object.assign({}, state);
    let validValues = {};
    let tree = this._itemMap;
    for(let field of this._fields) {
      //get form data (valid values for subtree)
      let fieldValues = Object.keys(tree);
      validValues[field] = fieldValues;

      let stateValue = state[field];
      let next = tree[stateValue];
      if(next === undefined) {
        let validStateValue = fieldValues[0];
        correctedState[field] = validStateValue;
        next = tree[validStateValue];
      }
      tree = next;
    }
    //leaf node is the dataset item
    let datasetItem: T = tree;
    //check if form info cached in item
    if(datasetItem.formData === null) {
      let filteredFormData = this.formData.filter(validValues);
      //cache form data in the item so don't have to recompute if same combination selected, can use this field to retrieve form data in caller
      datasetItem.formData = filteredFormData;
    }

    //process form data into FormData object by filtering values
    return {
      //leaf node is the dataset item
      item: datasetItem,
      state: correctedState
    }
  }
}

type StateData<T extends DatasetItem> = {
  item: T,
  state: StringMap
}


export abstract class DatasetItem {
  private _fieldData: {[tag: string]: DisplayData};
  private _rasterParams: StringMap;
  private _stationParams: StringMap;
  private _baseParams: StringMap;
  private _values: StringMap;
  private _formData: FormData;
  private _label: string;
  private _timeseriesData: TimeseriesData;
  private _requestFactory: RequestFactoryService

  constructor(values: StringMap, label: string, timeseriesData: TimeseriesData, requestFactory: RequestFactoryService) {
    this._values = values;
    this._formData = null;
    this._label = label;
    this._timeseriesData = timeseriesData;
    this._requestFactory = requestFactory;
  }

  get timeseriesData(): TimeseriesData {
    return this._timeseriesData;
  }

  get formData(): FormData {
    return this._formData;
  }

  set formData(formData: FormData) {
    this._formData = formData;
  }

  get values(): StringMap {
    return this._values;
  }

  get rasterParams(): StringMap {
    return this._rasterParams;
  }

  get stationParams(): StringMap {
    return this._stationParams;
  }

  get baseParams(): StringMap {
    return this._baseParams;
  }

  get label(): string {
    return this._label;
  }

  get coverageLabel(): string {
    return this.timeseriesData?.coverageLabel;
  }

  get start(): Moment {
    return this._timeseriesData?.start;
  }

  get end(): Moment {
    return this._timeseriesData?.end;
  }

  get unit(): UnitOfTime {
    return this._timeseriesData?.unit;
  }

  get interval(): number {
    return this._timeseriesData?.interval;
  }

  get period(): PeriodData {
    return this._timeseriesData?.period;
  }

  set dataset(dataset: Dataset<DatasetItem>) {
    this._baseParams = Object.assign({}, dataset.paramData);
    this._rasterParams = Object.assign({}, dataset.paramData);
    this._stationParams = Object.assign({}, dataset.paramData);
    this._fieldData = {
      dataset: dataset.displayData
    };
    dataset.formData.default.forEach(this._setNodeData.bind(this));
    for(let category of dataset.formData.categorized) {
      category.nodes.forEach(this._setNodeData.bind(this));
    }
    if(this._timeseriesData) {
      this._requestFactory.getDatasetDateRange(this._rasterParams).then(async (dateRange: RequestResults) => {
        this._timeseriesData.dateRange = await dateRange.toPromise();
      });
    }
  }

  private _setNodeData(node: FormNode) {
    let valueTag = this.values[node.tag];
    //get value data for item that matches the tag for this item
    let valueData = node.values.find((value: FormValue) => {
      return value.tag == valueTag;
    });
    this._baseParams = Object.assign(this._baseParams, valueData.paramData);
    if(valueData.applicability[0]) {
      this._rasterParams = Object.assign(this._rasterParams, valueData.paramData);
    }
    if(valueData.applicability[1]) {
      this._stationParams = Object.assign(this._stationParams, valueData.paramData);
    }
    this._fieldData[node.tag] = valueData.displayData;
  }

  getFieldLabel(field: string): string {
    return this._fieldData[field].label;
  }

  getFieldDescription(field: string): string {
    return this._fieldData[field].description;
  }
}


export class VisDatasetItem extends DatasetItem {
  private _includeStations: boolean;
  private _includeRaster: boolean;
  private _units: string;
  private _unitsShort: string;
  private _dataRange: [number, number];
  private _rangeAbsolute: [boolean, boolean];
  private _reverseColors: boolean;
  private _datatype: string;
  private _timeseriesSet: TimeseriesData[];
  private _optionData: OptionData;

  constructor(includeStations: boolean, includeRaster: boolean, units: string, unitsShort: string, datatype: string, label: string, dataRange: [number, number], rangeAbsolute: [boolean, boolean], focusTimeseries: TimeseriesData, timeseriesSet: TimeseriesData[], reverseColors: boolean, values: StringMap, optionData: OptionData, requestFactory: RequestFactoryService) {
    super(values, label, focusTimeseries, requestFactory);
    this._includeRaster = includeRaster;
    this._includeStations = includeStations;
    this._units = units;
    this._unitsShort = unitsShort;
    this._dataRange = dataRange;
    this._rangeAbsolute = rangeAbsolute;
    this._reverseColors = reverseColors;
    this._datatype = datatype;
    this._timeseriesSet = timeseriesSet;
    this._optionData = optionData;
  }

  get optionData(): OptionData {
    return this._optionData;
  }

  get dataypeLabel(): string {
    let label = this._datatype;
    if(this.displayStyle !== "standard") {
      label += " Change";
    }
    return label;
  }

  get datatype(): string {
    return this._datatype;
  }

  get includeStations(): boolean {
    return this._includeStations;
  }

  get includeRaster(): boolean {
    return this._includeRaster;
  }

  get units(): string {
    return this._optionData?.unitData.unit || this._units;
  }

  get unitsShort(): string {
    return this._optionData?.unitData.short || this._unitsShort;
  }

  get dataRange(): [number, number] {
    return this._optionData?.unitData.range || this._dataRange;
  }

  get displayStyle(): DisplayStyle {
    return this._optionData?.displayStyle || "standard";
  }

  get rangeAbsolute(): [boolean, boolean] {
    return this._rangeAbsolute;
  }

  get reverseColors(): boolean {
    return this._reverseColors;
  }

  get timeseriesSet(): TimeseriesData[] {
    return this._timeseriesSet;
  }
}

export type UnitOfTime = "year" | "month" | "day" | "hour" | "minute" | "second";

export class Form {
  node: FormNode
}

export interface ViewDataMap {
  [view: string]: ViewData
}

export interface ViewData {
  displayStyle: DisplayStyle,
  units: {
    [unit: string]: UnitData
  }
}
export interface UnitData {
  unit: string
  short: string,
  range: [number, number]
}


export class OptionData {
  private _typeNode: FormNode;
  private unitMap: {[type: string]: FormNode};
  private _viewDataMap: ViewDataMap;
  private _type: string;
  private _unit: string;

  //valid combos of options, use to create stripped down nodes
  constructor(typeNode: FormNode, unitMap: {[type: string]: FormNode}, viewDataMap: ViewDataMap, defaultType: string, defaultUnit: string) {
    this._typeNode = typeNode;
    this.unitMap = unitMap;
    this._viewDataMap = viewDataMap;
    this._type = defaultType;
    this._unit = defaultUnit;
  }

  public getUnitNode(type: string) {
    return this.unitMap[type];
  }

  get unitNode(): FormNode {
    return this.getUnitNode(this._type);
  }

  get displayStyle() {
    return this._viewDataMap[this._type].displayStyle;
  }

  get unitData() {
    return this._viewDataMap[this._type].units[this.unit];
  }
  get typeNode(): FormNode {
    return this._typeNode;
  }

  get type(): string {
    return this._type;
  }

  get unit(): string {
    return this._type == "percent"? "percent" : this._unit;
  }

  set type(type: string) {
    this._type = type;
  }

  set unit(unit: string) {
    this._unit = unit;
  }

  get paramData(): StringMap {
    let valueParamData = this._typeNode.values.filter((value: FormValue) => {
      return value.tag == this._type;
    })[0].paramData;
    let unitParamData = {};
    if(this.unitNode) {
      unitParamData = this.unitNode.values.filter((value: FormValue) => {
        return value.tag == this._unit;
      })[0].paramData;
    }

    return {
      ...valueParamData,
      ...unitParamData
    };
  }
}

export class PeriodData {
  private _unit: UnitOfTime;
  private _interval: number;
  private _tag: string;

  constructor(unit: UnitOfTime, interval: number, tag: string) {
    this._unit = unit;
    this._interval = interval;
    this._tag = tag;
  }

  get unit(): UnitOfTime {
    return this._unit;
  }

  get interval(): number {
    return this._interval;
  }

  get tag(): string {
    return this._tag;
  }
}



export class TimeseriesData {
  private _start: Moment;
  private _end: Moment;
  private _period: PeriodData;
  private _nextPeriod: PeriodData;
  private _dateHandler: DateManagerService;
  private _coverageLabel: string;
  private _defaultValue: Moment;

  constructor(period: PeriodData, nextPeriod: PeriodData, dateHandler: DateManagerService) {
    this._period = period;
    this._nextPeriod = nextPeriod;
    this._dateHandler = dateHandler;
    //set default range past current so default dates will stick to end
    //update in the year 10000
    this.dateRange = ["9999-01-01", "9999-01-01"];
  }

  expandDates(start: Moment, end: Moment) {
    let date = this.roundToInterval(start);
    end = this.roundToInterval(end);
    let dates = [];
    while(date.isSameOrBefore(end)) {
      dates.push(date.clone());
      date = this.addInterval(date, 1, false);
    }
    return dates;
  }

  addInterval(time: Moment, n: number = 1, lock: boolean = true): Moment {
    let result = this.roundToInterval(time);
    result.add(n * this.interval, this.unit);
    if(lock) {
      result = this.lockToRange(result);
    }
    return result;
  }

  roundToInterval(time: Moment) {
    let base = this._start.clone();
    let timeClone = time.clone();
    let intervalDiff = timeClone.diff(base, this.unit) / this.interval;
    let roundedDiff = Math.round(intervalDiff) * this.interval;
    base.add(roundedDiff, this.unit);
    base = this.lockToRange(base);
    return base;
  }

  lockToRange(time: Moment) {
    let res: Moment = time;
    if(time.isBefore(this._start)) {
      res = this._start.clone();
    }
    else if(time.isAfter(this._end)) {
      res = this._end.clone();
    }
    return res;
  }

  getLabel(date: Moment, fancy: boolean = true): string {
    return `${this._dateHandler.dateToString(date, this._period.unit, fancy)}`;
  }

  set dateRange(range: [string, string]) {
    let [start, end] = range;
    this._start = moment(start).tz("Pacific/Honolulu");
    this._end = moment(end).tz("Pacific/Honolulu");
    this._defaultValue = this._end.clone();
    this._coverageLabel = `${this._dateHandler.dateToString(this._start, this._period.unit, true)} - ${this._dateHandler.dateToString(this._end, this._period.unit, true)}`;
  }

  get coverageLabel(): string {
    return this._coverageLabel;
  };

  get defaultValue(): Moment {
    return this._defaultValue;
  }

  get start(): Moment {
    return this._start;
  }

  get end(): Moment {
    return this._end;
  }

  get unit(): UnitOfTime {
    return this._period.unit;
  }

  get interval(): number {
    return this._period.interval;
  }

  get period(): PeriodData {
    return this._period;
  }

  get nextPeriod(): PeriodData {
    return this._nextPeriod;
  }
}




export class FormCategory {
  private _displayData: DisplayData;
  private _nodes: FormNode[];

  constructor(displayData: DisplayData, nodes: FormNode[]) {
    this._displayData = displayData;
    this._nodes = nodes;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get nodes(): FormNode[] {
    return this._nodes;
  }
}

//note use "true" and "false" as special value tags for toggles
export class FormNode {
  private _displayData: DisplayData
  private _values: FormValue[];
  private _defaultValue: FormValue;

  constructor(displayData: DisplayData, values: FormValue[], defaultValue: FormValue = null) {
    this._displayData = displayData;
    this._values = values;
    this._defaultValue = defaultValue;
  }

  get defaultValue(): FormValue {
    return this._defaultValue;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get values(): FormValue[] {
    return this._values;
  }

  public filter(valueTags: string[], defaultValue?: string): FormNode {
    let tagSet = new Set(valueTags);
    if(defaultValue === undefined && this._defaultValue !== null) {
      defaultValue = this._defaultValue.tag;
    }
    let newDefault = null;
    let filteredValues = this._values.filter((value: FormValue) => {
      if(defaultValue !== undefined && value.tag == defaultValue) {
        newDefault = value;
      }
      return tagSet.has(value.tag);
    });
    return new FormNode(this._displayData, filteredValues, newDefault);
  }
}

export class FormValue {
  private _displayData: DisplayData;
  private _paramData: StringMap;
  private _applicability: [boolean, boolean];

  constructor(displayData: DisplayData, paramData: StringMap, applicability: [boolean, boolean]) {
    this._displayData = displayData;
    this._paramData = paramData;
    this._applicability = applicability;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get paramData(): StringMap {
    return this._paramData;
  }

  get applicability(): [boolean, boolean] {
    return this._applicability
  }
}

export class DisplayData {
  private _description: string;
  private _label: string;
  private _tag: string;

  constructor(description: string, label: string, tag: string) {
    this._description = description;
    this._label = label;
    this._tag = tag;
  }

  get description(): string {
    return this._description;
  }

  get label(): string {
    return this._label;
  }

  get tag(): string {
    return this._tag;
  }
}



//display data tag should be the type for the file sent to API
export class FileData {
  private _displayData: DisplayData;
  private _fileType: FileType;
  private _requires: string[];

  constructor(displayData: DisplayData, fileType: FileType, requires: string[]) {
    this._displayData = displayData;
    this._fileType = fileType;
    this._requires = requires;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get fileType(): FileType {
    return this._fileType;
  }

  get requires(): string[] {
    return this._requires;
  }
}

export class FileProperty {
  private _formData: FormNode;
  private _defaultValues: string[];

  constructor(formData: FormNode, defaultValues: string[]) {
    this._formData = formData;
    this._defaultValues = defaultValues;
  }

  get formData(): FormNode {
    return this._formData;
  }

  get defaultValues(): string[] {
    return this._defaultValues;
  }
}

class FileType {
  private _type: string;
  private _ext: string;
  private _description: string;

  constructor(type: string, ext: string, description: string) {
    this._type = type;
    this._ext = ext;
    this._description = description;
  }

  get type(): string {
    return this._type;
  }

  get ext(): string {
    return this._ext;
  }

  get description(): string {
    return this._description;
  }
}

export class FileGroup {
  private _fileData: FileData[];
  private _displayData: DisplayData;
  private _additionalProperties: FileProperty[];

  constructor(displayData: DisplayData, fileData: FileData[], additionalProperties: FileProperty[]) {
    this._fileData = fileData;
    this._displayData = displayData;
    this._additionalProperties = additionalProperties;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

   get fileData(): FileData[] {
    return this._fileData;
   }

   get additionalProperties(): FileProperty[] {
    return this._additionalProperties;
   }
}


//just make a separate structure for export, there are differences
//this doesn't need any separation so just have date range or no date range
//add period to additional properties in a file group is you want to allow multiples
export class ExportDatasetItem extends DatasetItem {
  private _fileGroups: FileGroup[];

  constructor(fileGroups: FileGroup[], values: StringMap, label: string, timeseriesData: TimeseriesData, requestFactory: RequestFactoryService) {
    super(values, label, timeseriesData, requestFactory);
    this._fileGroups = fileGroups;
  }

  get fileGroups(): FileGroup[] {
    return this._fileGroups;
  }
}




export class FormManager<T extends DatasetItem> {
  private _datasetFormData: DatasetFormData;
  private _datasets: {[tag: string]: Dataset<T>};
  private _values: StringMap;
  private _activeItem: T;
  private _state: StringMap;
  private _defaultState: StringMap;

  constructor(datasets: Dataset<T>[], datasetFormData: DatasetFormData, defaultState: StringMap) {
    this._defaultState = defaultState;
    this._state = Object.assign({}, defaultState);
    this._datasets = {};
    for(let dataset of datasets) {
      this._datasets[dataset.tag] = dataset;
    }
    this._datasetFormData = datasetFormData;
    this.updateState();
  }

  private updateState(): void {
    let dataset = this._datasets[this._state.datatype];
    let stateData = dataset.getStateData(this._state);
    this._state = stateData.state;
    this._activeItem = stateData.item;
    this._values = Object.assign({
      datatype: dataset.tag
    }, this._activeItem.values)
  }

  public resetState(): void {
    this._state = Object.assign({}, this._defaultState);
    this.updateState();
  }

  public setValue(field: string, tag: string): ActiveFormData<T> {
    if(field == "datatype") {
      return this.setDatatype(tag);
    }
    else {
      this._state[field] = tag;
      this.updateState();
      return this.getFormData();
    }
  }

  public setValues(values: StringMap): ActiveFormData<T> {
    Object.assign(this._state, values);
    this.updateState();
    return this.getFormData();
  }

  public setDatatype(tag: string): ActiveFormData<T> {
    if(this._datasets[tag]) {
      this._state["datatype"] = tag;
      this.updateState();
    }
    return this.getFormData();
  }

  public getFormData(): ActiveFormData<T> {
    return {
      datasetFormData: this._datasetFormData,
      datasetItem: this._activeItem,
      values: this._values
    };
  }
}

export type DisplayStyle = "diverging" | "standard" | "increasing";
