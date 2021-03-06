import $ from 'jquery';
import 'snapsvg-cjs';
import * as _ from 'lodash';
import { colors } from './colors';
import { firebase } from 'firebase';
import { loadCatcherFB } from './nine-positions-glove-loaders.js';


  const config = {
    apiKey: "AIzaSyCPjtBgbc6Noi-KVwxTjVcXZwB9s0X8DJQ",
    authDomain: "bc-qo-custom-profile-db.firebaseapp.com",
    databaseURL: "https://bc-qo-custom-profile-db.firebaseio.com",
    projectId: "bc-qo-custom-profile-db",
    storageBucket: "",
    messagingSenderId: "267068227199"
  };
  


export default class CustomGloveTool {

    constructor(options = {}) {
        console.log("running...")
        this.gloveData = { indicatorMap: [], gloveSeries: {}, design: "two-tone-glove", domSelected: '', domSelection: '', canvas: [{ "element": "svgMain", "svgBase": "_x5F_vw3" }, { "element": "svgInside", "svgBase": "_x5F_vw2" }, { "element": "svgSide", "svgBase": "_x5F_vw1" }] }
        this.indicatorMap = this.gloveData.indicatorMap;
        this.gloveSeries = this.gloveData.gloveSeries;
        this.design = this.gloveData.design;
        this.canvas = this.gloveData.canvas;
        this.selectedColors = {
            "body": '',
            "accent": '',
            "trim": '',
            "logo": ''
        }
        _.assignIn(this.selectedColors, options);

        this.designTemplate = [{
            "productId": "55",
            "designTemplate": "tri-tone-glove",
            "build": {
                "body": ["_x5F_rngo", "_x5F_bfg","_x5F_rngi", "_x5F_pnko", "_x5F_pnki", "_x5F_mid", "_x5F_indi", "_x5F_plm", "_x5F_thbo", "_x5F_wst"],
                "accent": ["_x5F_indo", "_x5F_thbi","_x5F_mid"],
                "trim": ["_x5F_wlt", "_x5F_bnd", "_x5F_stch", "_x5F_web", "_x5F_lce"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },{
            "productId": "55",
            "designTemplate": "one-color-glove",
            "build": {
                "body": ["_x5F_rngo", "_x5F_bfg","_x5F_rngi", "_x5F_pnko", "_x5F_pnki", "_x5F_mid", "_x5F_indi", "_x5F_plm", "_x5F_thbo", "_x5F_wst","_x5F_indo", "_x5F_thbi","_x5F_thb","_x5F_wlt", "_x5F_bnd", "_x5F_stch", "_x5F_web", "_x5F_lce","_x5F_tgt","_x5F_dwmid"],
                "accent": [],
                "trim": [],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "two-tone-glove",
            "build": {
                "body": ["_x5F_rngo", "_x5F_rngi","_x5F_bfg", "_x5F_pnko", "_x5F_pnki", "_x5F_mid", "_x5F_indi", "_x5F_plm", "_x5F_thbo", "_x5F_indo", "_x5F_thbi"],
                "accent": ["_x5F_web", "_x5F_wst","_x5F_mid","_x5F_dwmid"],
                "trim": ["_x5F_wlt", "_x5F_bnd", "_x5F_stch", "_x5F_lce"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "web-change-glove",
            "build": {
                "body": ["_x5F_wst", "_x5F_bfg", "_x5F_mid", "_x5F_bnd", "_x5F_stch", "_x5F_lce", "_x5F_rngo", "_x5F_rngi", "_x5F_pnko", "_x5F_pnki", "_x5F_mid", "_x5F_indi", "_x5F_plm", "_x5F_thbo", "_x5F_indo", "_x5F_thbi","_x5F_dwmid"],
                "accent": ["_x5F_web", "_x5F_wlt"],
                "trim": [],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "first-base-tri-color",
            "build": {
                "body": ["_x5F_wst", "_x5F_bfg","_x5F_thb", "_x5F_plm"],
                "accent": ["_x5F_utoe","_x5F_web"],
                "trim": ["_x5F_lce", "_x5F_bnd", "_x5F_stch"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "first-base-dual-color",
            "build": {
                "body": ["_x5F_wst", "_x5F_stch", "_x5F_lce", "_x5F_bfg","_x5F_thb"],
                "accent": ["_x5F_utoe","_x5F_plm","_x5F_bnd"],
                "trim": [],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "first-base-lace-change",
            "build": {
                "body": ["_x5F_wst", "_x5F_bnd", "_x5F_bfg","_x5F_thb","_x5F_utoe","_x5F_plm"],
                "accent": [],
                "trim": ["_x5F_lce", "_x5F_stch"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "catchers-tri-color",
            "build": {
                "body": ["_x5F_wst", "_x5F_bfg", "_x5F_thb", "_x5F_plm"],
                "accent": ["_x5F_utoe","_x5F_web","_x5F_tgt"],
                "trim": ["_x5F_lce", "_x5F_bnd", "_x5F_stch"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "catchers-dual-color",
            "build": {
                "body": ["_x5F_wst", "_x5F_bnd", "_x5F_stch", "_x5F_lce", "_x5F_bfg", "_x5F_thb", "_x5F_tgt"],
                "accent": ["_x5F_utoe","_x5F_plm"],
                "trim": [],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        },
        {
            "productId": "56",
            "designTemplate": "catchers-lace-change",
            "build": {
                "body": ["_x5F_wst", "_x5F_bnd", "_x5F_bfg","_x5F_thb","_x5F_utoe","_x5F_plm","_x5F_tgt"],
                "accent": [],
                "trim": ["_x5F_lce", "_x5F_stch"],
                "logo": ["_x5F_logo", "_x5F_fgrl"]
            }
        }

        ];

   
        this.init();
        setTimeout(() => { this.setFill('body', 'red', "of") }, 9000);

        firebase.initializeApp(config);
    }

    init() {
        this.svgMain = Snap("#svgMain");
        this.svgInside = Snap("#svgInside");
        this.svgSide = Snap("#svgSide");

        /* Glove Group Containers */
        this.oView = this.svgMain.group(), this.iView = this.svgInside.group(), this.sView = this.svgSide.group();

        this.loadInfield2Welt();

    };

    //** Function run to return current glove section and color chosen to render in glove canvas */
    getSelectedColorHex(colorString) {
        let colorCode;
        _.forEach(colors, (r) => {
            if (_.lowerCase(colorString) === _.lowerCase(r.value)) {
                colorCode = r.hex;
            }
        })
        return colorCode;
    }

    applyToCanvas(db = {}, selectedFill, gloveType, currentValue) {
        let self = this;
        const data = db;
        const fillHex = selectedFill;
        const glove = gloveType;
        const baseValue = currentValue.toString();

        _.forEach(this.canvas, (value, key) => {
            let el = value.element;
            let baseElement = value.svgBase
            let svgElement = ("#" + glove + baseElement).toString();
            switch (baseValue) {
                case "body":
                    _.forEach(data, (d) => {
                        let element = (svgElement + d);
                        switch (el) {
                            case "svgMain":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgMain.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgInside":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgInside.select(element).attr({ fill: fillHex });
                                }

                                break;
                            case "svgSide":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgSide.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgSide.select(element).attr({ fill: fillHex });
                                }

                                break;
                            default:
                                break;
                        }
                    })
                    break;
                case "accent":
                    _.forEach(data, (d) => {
                        let element = (svgElement + d);
                        switch (el) {
                            case "svgMain":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgMain.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgInside":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgInside.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgSide":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgInSide.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgSide.select(element).attr({ fill: fillHex });
                                }
                                break;
                            default:
                                break;
                        }
                    })
                    break;
                case "trim":
                    _.forEach(data, (d) => {
                        let element = (svgElement + d);
                        switch (el) {
                            case "svgMain":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex});
                                        break;
                                    }
                                    self.svgMain.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgInside":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgInside.select(element).attr({ fill: fillHex });
                                }

                                break;
                            case "svgSide":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgSide.select(element).attr({ "fill": 'none', stroke: fillHex});

                                        break;
                                    }
                                    self.svgSide.select(element).attr({ fill: fillHex });
                                }
                                break;
                            default:
                                break;
                        }
                    })
                    break;
                case "logo":
                    _.forEach(data, (d) => {
                        let element = (svgElement + d);
                        switch (el) {
                            case "svgMain":
                                if ($(element).length != 0) {
                                    self.svgMain.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgInside":
                                if ($(element).length != 0) {
                                    console.log(element);
                                    self.svgInside.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgSide":
                                if ($(element).length != 0) {
                                    self.svgSide.select(element).attr({ fill: fillHex });
                                }
                                break;
                            default:
                                break;
                        }
                    })
                    break;
                default:
                    break;
            }
        })
    }


    defaultColor(colors = {}) {
        let self = this;
        const domSelected = self.gloveData.domSelected;
        const domSelection = self.gloveData.domSelection;

        _.forEach(self.designTemplate, (d) => {
            if (d.designTemplate === self.design) {
                let body = d.build.body;
                let accent = d.build.accent;
                let trim = d.build.trim;
                let logo = d.build.logo;

                _.forEach(self.canvas, (value, key) => {
                    let el = value.element;
                    let base = value.svgBase;
                    let id = (("#of" + base).toString());

                    switch (self.design) {
                        case "two-tone-glove":
                            _.forEach(body, (r) => {
                                let elm = (id + r).toString();
                                const fill = "grey"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svg(Inside).select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.accent});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })


                            _.forEach(accent, (r) => {
                                let elm = (id + r).toString();
                                const fill = "grey"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svg(Inside).select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.accent});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(trim, (r) => {
                                let elm = (id + r).toString();
                                const fill = "yellow";
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            if (_.includes(elm, "stch")) {
                                                self.svgMain.select(elm).attr({ stroke: fill, fill: 'none' });

                                                break;
                                            }
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgInside":
                                            if (_.includes(elm, "stch")) {
                                                self.svgInside.select(elm).attr({ stroke: fill, fill: 'none' });
                                                //self.svgInside.select(elm).attr({stroke: colors.accent, fill: 'none'});
                                                break;
                                            }
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgSide":
                                            if (_.includes(elm, "stch")) {
                                                self.svgSide.select(elm).attr({ stroke: fill, fill: 'none' });
                                                //self.svgSide.select(elm).attr({stroke: colors.accent, fill: 'none'});
                                                break;
                                            }
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: color.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(logo, (r) => {

                                let elm = (id + r).toString();
                                const fill = "#C5B358"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: color.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            break;
                        case "web-change-glove":
                            _.forEach(body, (r) => {
                                let elm = (id + r).toString();
                                const fill = "blue";
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.accent});
                                            if (_.includes(elm, "stch")) {
                                                self.svgMain.select(elm).attr({ "fill": 'none', stroke: fill });

                                                break;
                                            }
                                            break;
                                        case "svgInside":
                                            if (_.includes(elm, "stch")) {
                                                self.svgInside.select(elm).attr({ "fill": 'none', stroke: fill });

                                                break;
                                            }
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svg(Inside).select(elm).attr({fill: colors.accent});

                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.accent});
                                            if (_.includes(elm, "stch")) {
                                                console.log("stitching")
                                                self.svgSide.select(elm).attr({ "fill": 'none', "stroke": "red" });

                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(accent, (r) => {
                                let elm = (id + r).toString();
                                const fill = "grey"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svg(Inside).select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgSide":

                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.accent});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(logo, (r) => {

                                let elm = (id + r).toString();
                                const fill = "#C5B358"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: color.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                        case "tri-tone-glove":
                            _.forEach(body, (r) => {
                                let elm = (id + r).toString();
                                const fill = "blue"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.body});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: colors.body});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }

                            })

                            _.forEach(accent, (r) => {
                                let elm = (id + r).toString();
                                const fill = "grey"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svg(Inside).select(elm).attr({fill: colors.accent});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: colors.accent});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(trim, (r) => {
                                let elm = (id + r).toString();
                                const fill = "yellow";
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            if (_.includes(elm, "stch")) {
                                                self.svgMain.select(elm).attr({ stroke: fill, fill: 'none' });

                                                break;
                                            }
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgInside":
                                            if (_.includes(elm, "stch")) {
                                                self.svgInside.select(elm).attr({ stroke: fill, fill: 'none' });
                                                //self.svgInside.select(elm).attr({stroke: colors.accent, fill: 'none'});
                                                break;
                                            }
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgSide":
                                            if (_.includes(elm, "stch")) {
                                                self.svgSide.select(elm).attr({ stroke: fill, fill: 'none' });
                                                //self.svgSide.select(elm).attr({stroke: colors.accent, fill: 'none'});
                                                break;
                                            }
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: color.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            _.forEach(logo, (r) => {

                                let elm = (id + r).toString();
                                const fill = "#C5B358"
                                if ($(elm).length) {
                                    switch (el) {
                                        case "svgMain":
                                            self.svgMain.select(elm).attr({ fill: fill });
                                            //self.svgMain.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgInside":
                                            self.svgInside.select(elm).attr({ fill: fill });
                                            //self.svgInside.select(elm).attr({fill: color.body});
                                            break;
                                        case "svgSide":
                                            self.svgSide.select(elm).attr({ fill: fill });
                                            //self.svgSide.select(elm).attr({fill: color.body});
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })

                            break;

                        default:
                            break;
                    }
                })
            }
        })

    }


    //** Fill glove  */
    setFill(domInput, domValue, gloveType = "inf") {
        let self = this;
        const attributeSelection = domInput;
        const attributeValue = domValue;
        const colorHex = this.getSelectedColorHex(attributeValue);
        _.forEach(self.designTemplate, (d) => {
            if (d.designTemplate === self.design) {
                let obj = _.assignIn({}, d.build);
                _.forEach(self.canvas, (value, key) => {
                    let el = value.element;
                    let base = value.svgBase;
                    let id = gloveType;
                    switch (attributeSelection) {
                        case "body":
                            self.applyToCanvas(obj.body, colorHex, id, attributeSelection);
                            break;
                        case "accent":
                            self.applyToCanvas(obj.accent, colorHex, id, attributeSelection);
                            break;
                        case "trim":
                            self.applyToCanvas(obj.trim, colorHex, id, attributeSelection)
                            break;
                        case "logo":
                            self.applyToCanvas(obj.logo, colorHex, id, attributeSelection)
                            break;
                        default:
                            break;
                    }
                })
            }
        })


    }

    //** Set glove series selection in local model*/
    // TODO - Examine value output from frontend and make necessary changes
    setGloveSeries(valueString, formValue) {
        let key = "series";
        let value = "value";

        this.gloveData.gloveSeries[key] = valueString;
        this.gloveData.gloveSeries[value] = formValue;
    }

    //** Set glove emobroidery on canvas */
    setSeriesOnGlove(input, element) {
        let self = this;
        let series = input;

        let currentSeries = self.gloveSeries.series;
        let comparison = _.includes(currentSeries, series);

        if (comparison) {
            switch (series) {
                case "elite":
                    element.attr({ opacity: 1 })
                    break;
                case "rise":
                    element.attr({ opacity: 1 })
                    break;
                default:
                    element.attr({ opacity: 0 })
                    break;
            }
        }

    }

     //** Loads Catcher's mitt glove canvas */
    loadCatcher() {
        let self = this;
        Snap.load("assets/images/catcher_back_view.svg", (f) => {

            this.svgMain.attr({ viewBox: "0 0 400 400" });


            var g = f.selectAll('#cm_x5F_vw3_x5F_utoe, #cm_x5F_vw3_x5F_thb, #cm_x5F_vw3_x5F_bfg, #cm_x5F_vw3_x5F_web, #cm_x5F_vw3_x5F_plm, #cm_x5F_vw3_x5F_lin, #cm_x5F_vw3_x5F_bnd, #cm_x5F_vw3_x5F_fpad, #cm_x5F_vw3_x5F_stch, #cm_x5F_vw3_x5F_lce, #cm_x5F_vw3_x5F_logo, #cm_x5F_open_x5F_back');
            g.forEach(function (el, i) {
                var p = ["cm_x5F_vw3_x5F_utoe", "cm_x5F_vw3_x5F_thb", "cm_x5F_vw3_x5F_bfg", "cm_x5F_vw3_x5F_web", "cm_x5F_vw3_x5F_plm", "cm_x5F_vw3_x5F_lin", "cm_x5F_vw3_x5F_bnd", "cm_x5F_vw3_x5F_fpad", "cm_x5F_vw3_x5F_stch", "cm_x5F_vw3_x5F_lce", "cm_x5F_vw3_x5F_logo", "#cm_x5F_open_xF_back"];
                var layer = p[i];

                //Apply default fills & add to group
                self.oView.add(el);
                self.svgMain.append(self.oView);
                self.defaultColor();
            });

    });

        Snap.load("assets/images/catcher_inside_view.svg", (f) => {
            this.svgInside.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#cm_x5F_vw2_x5F_plm, #cm_x5F_vw2_x5F_web, #cm_x5F_vw2_x5F_tgt, #cm_x5F_vw2_x5F_stch, #cm_x5F_vw2_x5F_bnd, #cm_x5F_vw2_x5F_lce, #cm_x5F_pocket_x5F_view');

            g.forEach((el, i) => {
                var p = ["cm_x5F_vw2_x5F_plm", "cm_x5F_vw2_x5F_web", "cm_x5F_vw2_x5F_tgt", "cm_x5F_vw2_x5F_stch", "cm_x5F_vw2_x5F_bnd", "cm_x5F_vw2_x5F_lce", "cm_x5F_pocket_x5F_view"];
                var layer = p[i];
                //Apply default fills & add to group
                self.iView.add(el);
                self.svgInside.append(self.iView);
                self.defaultColor();
            });

        });

        Snap.load("assets/images/catcher_side_view.svg", (f) => {
            this.svgSide.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#cm_x5F_vw1_x5F_utoe, #cm_x5F_vw1_x5F_thb, #cm_x5F_vw1_x5F_logo, #cm_x5F_vw1_x5F_bnd, #cm_x5F_vw1_x5F_plm, #cm_x5F_vw1_x5F_web, #cm_x5F_vw1_x5F_fpad, #cm_x5F_vw1_x5F_stch, #cm_x5F_vw1_x5F_lce, #cm_x5F_side_x5F_view, #cm_block_font, #cm_script_font');

            g.forEach((el, i) => {
                var p = ["cm_x5F_vw1_x5F_utoe", "cm_x5F_vw1_x5F_thb", "cm_x5F_vw1_x5F_logo", "cm_x5F_vw1_x5F_bnd", "cm_x5F_vw1_x5F_plm", "cm_x5F_vw1_x5F_web", "cm_x5F_vw1_x5F_fpad", "cm_x5F_vw1_x5F_stch", "cm_x5F_vw1_x5F_lce", "cm_x5F_side_x5F_view", "cm_block_font", "cm_script_font"];
                var layer = p[i];

                //Apply default fills & add to group
                self.sView.add(el);
                self.svgSide.append(self.sView);
                self.defaultColor();
                //self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
            });
    });

    }

    loadCatcherFB() {
        let self = this;
        Snap.load("assets/images/catcher_fastback_back.svg", (f) => {

            this.svgMain.attr({ viewBox: "0 0 400 400" });


            var g = f.selectAll('#cmf_x5F_vw3_x5F_utoe, #cmf_x5F_vw3_x5F_thb, #cmf_x5F_vw3_x5F_logo, #cmf_x5F_vw3_x5F_mid, #cmf_x5F_vw3_x5F_bfg, #cmf_x5F_vw3_x5F_plm, #cmf_x5F_vw3_x5F_wlt ,#cmf_x5F_vw3_x5F_stch, #cmf_x5F_vw3_x5F_bnd, #cmf_x5F_vw3_x5F_web, #cmf_x5F_vw3_x5F_logo, #cmf_x5F_vw3_x5F_fpad, #cmf_x5F_fastback_x5F_back');
            g.forEach(function (el, i) {
                var p = ["cmf_x5F_vw3_x5F_utoe", "cmf_x5F_vw3_x5F_thb", "#cmf_x5F_vw3_x5F_logo" , "#cmf_x5F_vw3_x5F_mid" , "cmf_x5F_vw3_x5F_bfg", "#cmf_x5F_vw3_x5F_plm", "#cmf_x5F_vw3_x5F_wlt", "#cmf_x5F_vw3_x5F_stch", "cmf_x5F_vw3_x5F_bnd", "cmf_x5F_vw3_x5F_web", "cmf_x5F_vw3_x5F_logo", "cmf_x5F_vw3_x5F_fpad", "cmf_x5F_fastback_xF_back"];
                var layer = p[i];

                //Apply default fills & add to group
                self.oView.add(el);
                self.svgMain.append(self.oView);
                self.defaultColor();
            });

        });

        Snap.load("assets/images/catcher_inside_view.svg", (f) => {
            this.svgInside.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#cm_x5F_vw2_x5F_plm, #cm_x5F_vw2_x5F_web, #cm_x5F_vw2_x5F_tgt, #cm_x5F_vw2_x5F_stch, #cm_x5F_vw2_x5F_bnd, #cm_x5F_vw2_x5F_lce, #cm_x5F_pocket_x5F_view');

            g.forEach((el, i) => {
                var p = ["cm_x5F_vw2_x5F_plm", "cm_x5F_vw2_x5F_web", "cm_x5F_vw2_x5F_tgt", "cm_x5F_vw2_x5F_stch", "cm_x5F_vw2_x5F_bnd", "cm_x5F_vw2_x5F_lce", "cm_x5F_pocket_x5F_view"];
                var layer = p[i];
                //Apply default fills & add to group
                self.iView.add(el);
                self.svgInside.append(self.iView);
                self.defaultColor();
            });

        });

        Snap.load("assets/images/catcher_fastback_side.svg", (f) => {
            this.svgSide.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#cmf_x5F_vw1_x5F_thb, #cmf_x5F_vw1_x5F_logo, #cmf_x5F_vw1_x5F_utoe, #cmf_x5F_vw1_x5F_wlt, #cmf_x5F_vw1_x5F_web, #cmf_x5F_vw1_x5F_bnd, #cmf_x5F_vw1_x5F_plm, #cmf_x5F_vw1_x5F_stch, #cmf_x5F_vw1_x5F_blt, #cmf_x5F_vw1_x5F_lce, #cmf_x5F_vw1_x5F_fastback_x5F_side');

            g.forEach((el, i) => {
                var p = ["cmf_x5F_vw1_x5F_thb", "cmf_x5F_vw1_x5F_logo", "cmf_x5F_vw1_x5F_utoe", "cmf_x5F_vw1_x5F_wlt", "cmf_x5F_vw1_x5F_web", "cmf_x5F_vw1_x5F_bnd", "cmf_x5F_vw1_x5F_plm", "cmf_x5F_vw1_x5F_stch", "cmf_x5F_vw1_x5F_blt", "cmf_x5F_vw1_x5F_lce", "cmf_x5F_vw1_x5F_fastback_x5F_side"];
                var layer = p[i];

                //Apply default fills & add to group
                self.sView.add(el);
                self.svgSide.append(self.sView);
                self.defaultColor();
                //self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
            });

        });

    }

    //** Loads outfield glove canvas */
    loadOutfield() {
        let self = this;
        Snap.load("./assets/images/outfield_back_view.svg", (f) => {
            this.svgMain.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneMainVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#of_x5F_vw3_x5F_wst, #of_x5F_vw3_x5F_logo, #of_x5F_vw3_x5F_indo, #of_x5F_vw3_x5F_indi, #of_x5F_vw3_x5F_mid, #of_x5F_vw3_x5F_rngo, #of_x5F_vw3_x5F_rngi, #of_x5F_vw3_x5F_pnko, #of_x5F_vw3_x5F_pnki, #of_x5F_vw3_x5F_plm, #of_x5F_vw3_x5F_wlt, #of_x5F_vw3_x5F_bnd, #of_x5F_vw3_x5F_stch, #of_x5F_vw3_x5F_web, #of_x5F_vw3_x5F_lce, #of_x5F_open_x5F_back');

            g.forEach(function (el, i) {
                var p = ["of_x5F_vw3_x5F_wst", "of_x5F_vw3_x5F_logo", "of_x5F_vw3_x5F_indo", "of_x5F_vw3_x5F_indi", "of_x5F_vw3_x5F_mid", "of_x5F_vw3_x5F_rngo", "of_x5F_vw3_x5F_rngi", "of_x5F_vw3_x5F_pnko", "of_x5F_vw3_x5F_pnki", "of_x5F_vw3_x5F_plm", "of_x5F_vw3_x5F_wlt", "of_x5F_vw3_x5F_bnd", "of_x5F_vw3_x5F_stch", "of_x5F_vw3_x5F_web", "of_x5F_vw3_x5F_lce", "of_x5F_open_x5F_back"];
                var layer = p[i];
                if (_.includes(layer, "stch")) {
                    el.attr({ fill: 'none' });
                }

                self.oView.add(el);
                self.svgMain.append(self.oView);
                self.defaultColor();
            });

        });

        Snap.load("./assets/images/outfield_inside_view.svg", (f) => {
            this.svgInside.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#of_x5F_vw2_x5F_thbo, #of_x5F_vw2_x5F_thbi, #of_x5F_vw2_x5F_plm, #of_x5F_vw2_x5F_indo, #of_x5F_vw2_x5F_indi, #of_x5F_vw2_x5F_mid, #of_x5F_vw2_x5F_rngo, #of_x5F_vw2_x5F_rngi, #of_x5F_vw2_x5F_pnki, #of_x5F_vw2_x5F_pnko, #of_x5F_vw2_x5F_wlt, #of_x5F_vw2_x5F_web, #of_x5F_vw2_x5F_bnd, #of_x5F_vw2_x5F_stch, #of_x5F_vw2_x5F_lce, #of_x5F_open_x5F_pocket');

            g.forEach((el, i) => {
                var p = ["of_x5F_vw2_x5F_thbo", "of_x5F_vw2_x5F_thbi", "of_x5F_vw2_x5F_plm", "of_x5F_vw2_x5F_indo", "of_x5F_vw2_x5F_indi", "of_x5F_vw2_x5F_mid", "of_x5F_vw2_x5F_rngo", "of_x5F_vw2_x5F_rngi", "of_x5F_vw2_x5F_pnki", "of_x5F_vw2_x5F_pnko", "of_x5F_vw2_x5F_wlt", "of_x5F_vw2_x5F_web", "of_x5F_vw2_x5F_bnd", "of_x5F_vw2_x5F_stch", "of_x5F_vw2_x5F_lce", "of_x5F_open_x5F_pocket"];
                var layer = p[i];
                if (_.includes(layer, "stch")) {
                    el.attr({ fill: 'none' });
                }

                self.iView.add(el);
                self.svgInside.append(self.iView);
                self.defaultColor();
            });

        });

        Snap.load("./assets/images/outfield_side_view.svg", (f) => {
            this.svgSide.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#of_x5F_vw1_x5F_wst,#of_x5F_vw1_x5F_logo, #of_x5F_vw1_x5F_thbi, #of_x5F_vw1_x5F_thbo, #of_x5F_vw1_x5F_indo, #of_x5F_vw1_x5F_plm,#of_x5F_vw1_x5F_web, #of_x5F_vw1_x5F_bnd, #of_x5F_vw1_x5F_wlt, #of_x5F_vw1_x5F_stch, #of_x5F_vw1_x5F_lce, #of_x5F_side_x5F_view');

            g.forEach((el, i) => {
                var p = ["of_x5F_vw1_x5F_wst", "of_x5F_vw1_x5F_logo", "of_x5F_vw1_x5F_thbi", "of_x5F_vw1_x5F_thbo", "of_x5F_vw1_x5F_indo", "of_x5F_vw1_x5F_plm", "of_x5F_vw1_x5F_web", "of_x5F_vw1_x5F_bnd", "of_x5F_vw1_x5F_wlt", "of_x5F_vw1_x5F_stch", "of_x5F_vw1_x5F_lce", "of_x5F_side_x5F_view"];
                var layer = p[i];
                if (_.includes(layer, "stch")) {
                    el.attr({ fill: 'none', stroke: 'red' });
                }

                self.sView.add(el);

                self.svgSide.append(self.sView);
                self.defaultColor();
            });

        });


    };

    //** Loads infield glove canvas */
    loadInfield() {
        let self = this;

        Snap.load("assets/images/infield_swelt_back.svg", (f) => {
            this.svgMain.attr({ viewBox: "0 0 400 400" });

            var g = f.selectAll('#inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_thbi, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_indo, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_indi, #inf_x5F_vw3_x5F_mid, #inf_x5F_vw3_x5F_rngo, #inf_x5F_vw3_x5F_rngi, #inf_x5F_vw3_x5F_pnko, #inf_x5F_vw3_x5F_pnki, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_lce, #inf_x5F_open_x5F_back,#inf_x5F_vw3_x5F_rise,#inf_x5F_vw3_x5F_elite,#inf_x5F_logo_x5F_elite,#inf_x5F_logo_x5F_rise');
            g.forEach((el, i) => {
                var p = ["inf_x5F_vw3_x5F_wst", "inf_x5F_vw3_x5F_thbi", "inf_x5F_vw3_x5F_web", "inf_x5F_vw3_x5F_indo", "inf_x5F_vw3_x5F_plm", "inf_x5F_vw3_x5F_indi", "inf_x5F_vw3_x5F_mid", "inf_x5F_vw3_x5F_rngo", "inf_x5F_vw3_x5F_rngi", "inf_x5F_vw3_x5F_pnko", "inf_x5F_vw3_x5F_pnki", "inf_x5F_vw3_x5F_logo", "inf_x5F_vw3_x5F_wlt", "inf_x5F_vw3_x5F_stch", "inf_x5F_vw3_x5F_bnd", "inf_x5F_vw3_x5F_lce", "inf_x5F_open_x5F_back","inf_x5F_vw3_x5F_rise","inf_x5F_vw3_x5F_elite","inf_x5F_logo_x5F_elite","inf_x5F_logo_x5F_rise"];
                var layer = p[i];
                var filter = layer.split('_').pop();

                //Apply default fills & add to group
                self.defaultColor(layer, el, self.oView);

                if (filter === "rise" || filter === "elite"){
                    el.attr({opacity:0})
                    this.setSeriesOnGlove(filter,el);
                }

                self.oView.add(el);
                self.svgMain.append(self.oView);
                
            });

            //gloveMap Values
            var gloveMap = [{ name: 'mid', x: 145, y: 120, title: 'middle finger', model: 'middleFinger', canvas: ["mOutside"] },
            { name: 'indo', x: 236, y: 85, title: 'index outer', model: 'indexOuter', canvas: ["mOutside"] },
            { name: 'indi', x: 205, y: 85, title: 'index inner', model: 'indexInner', canvas: ["mOutside"] },
            { name: 'rngo', x: 115, y: 82, title: 'ring outer', model: 'ringOuter', canvas: ["mOutside"] },
            { name: 'rngi', x: 88, y: 110, title: 'ring inner', model: 'ringInner', canvas: ["mOutside"] },
            { name: 'pnko', x: 75, y: 180, title: 'pinky outer', model: 'pinkyOuter', canvas: ["mOutside"] },
            { name: 'pnki', x: null, y: null, title: 'pinky inner', model: 'pinkyInner', canvas: ["mInside"] },
            { name: 'web', x: null, y: null, title: 'web', model: 'webColor', canvas: ["mInside"] },
            { name: 'bnd', x: null, y: null, title: 'binding', model: 'bindingColor', canvas: ["mInside"] },
            //{ name: 'lin', x: 110.6, y: 230.2, title: 'inside lining', model:'liningColor',canvas: ["mOutside"] },
            //{ name: 'fpad', x: null, y: null, title: 'finger protection', canvas: ["mSideview"] },
            { name: 'lce', x: null, y: null, title: 'lace', model: 'laceColor', canvas: ["mSideview"] },
            { name: 'stch', x: null, y: null, title: 'stitching', model: 'stitchingColor', canvas: ["mOutside"] },
            { name: 'logo', x: 244, y: 300, title: '9P logo', model: 'logoColor', canvas: ["mOutside"] },
            { name: 'wlt', x: 178, y: 150, title: 'welt', model: 'weltColor', canvas: ["mOutside", "mSideview"] },
            { name: 'wst', x: 150, y: 298, title: 'wrist', model: 'wristColor', canvas: ["mOutside", "mSideview"] },
            { name: 'fgrl', x: 160, y: 28.9, title: 'finger logo', model: 'seriesColor', canvas: ["mOutside"] },
            { name: 'thbi', x: null, y: null, title: 'thumb inner', model: 'thumbInner', canvas: ["mSideview"] },
            { name: 'thbo', x: null, y: null, title: 'thumb outer', model: 'thumbOuter', canvas: ["mInside", "mSideview"] },
            { name: 'plm', x: null, y: null, title: 'palm', model: 'palmColor', canvas: ["mInside", "mSideview"] }
            ];

            this.indicatorMap = [];

            _.forEach(gloveMap, (r) => {
                ((function (r) {
                    if (r.x == null && r.y == null) {
                        self.indicatorMap.push({ name: r.name, model: r.model, touched: false, canvas: r.canvas });
                    } else {
                        self.indicatorMap.push({ name: r.name, model: r.model, touched: false, canvas: r.canvas });
                    }
                    // self.drawSvgCanvas("main",btn,vBtn);
                })(r), false)
            })

        });

        Snap.load("assets/images/infield_swelt_pocket.svg", (f) => {
            this.svgInside.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_thbo, #inf_x5F_vw2_x5F_thbi, #inf_x5F_vw2_x5F_indo, #inf_x5F_vw2_x5F_indi,#inf_x5F_vw2_x5F_mid,#inf_x5F_vw2_x5F_rngo,#inf_x5F_vw2_x5F_rngi,#inf_x5F_vw2_x5F_pnko,#inf_x5F_vw2_x5F_pnki, #inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_bnd , #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_lce, #inf_x5F_open_x5F_pocket');
            g.forEach((el, i) => {
                var p = ["inf_x5F_vw2_x5F_plm", "inf_x5F_vw2_x5F_thbo", "inf_x5F_vw2_x5F_thbi", "inf_x5F_vw2_x5F_indo", "inf_x5F_vw2_x5F_indi", "inf_x5F_vw2_x5F_mid", "inf_x5F_vw2_x5F_rngo", "inf_x5F_vw2_x5F_rngi", "inf_x5F_vw2_x5F_pnko", "inf_x5F_vw2_x5F_pnki", "inf_x5F_vw2_x5F_web", "inf_x5F_vw2_x5F_stch", "inf_x5F_vw2_x5F_bnd", "inf_x5F_vw2_x5F_wlt", "inf_x5F_vw2_x5F_lce", "inf_x5F_open_x5F_pocket"];
                var layer = p[i];

                //Apply default fills & add to group
                self.defaultColor(layer, el, this.iView);

                self.iView.add(el);
                self.svgInside.append(this.iView);
                self.defaultColor();
                // self.gloveCloneInsideVertical.append(self.svgInside.clone(self.iView));
            });

            //Layer Values
            var gloveMap = [{ name: 'plm', x: 200, y: 167.1, title: 'PALM' },
            { name: 'thbo', x: 91, y: 235.5, title: 'Thumb Outer' },
            //{ name: 'lce', x: 196.4, y: 30.1, title: 'lace' },
            { name: 'pnki', x: 356, y: 170, title: 'Pinky inner' },
            { name: 'web', x: 82, y: 100, title: 'Web' }
            ];
        });

        Snap.load("assets/images/infield_swelt_side.svg", (f) => {
            this.svgSide.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#inf_x5F_vw1_x5F_thbi, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_indi, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_logo, #inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_indo, #inf_x5F_vw1_x5F_thbo, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_stch,  #inf_x5F_vw1_x5F_lce, #inf_x5F_open_x5F_side');

            g.forEach((el, i) => {
                var p = ["inf_x5F_vw1_x5F_thbi", "inf_x5F_vw1_x5F_mid", "inf_x5F_vw1_x5F_indi", "inf_x5F_vw1_x5F_wst", "inf_x5F_vw1_x5F_logo", "inf_x5F_vw1_x5F_plm", "inf_x5F_vw1_x5F_bnd", "inf_x5F_vw1_x5F_indo", "inf_x5F_vw1_x5F_thbo", "inf_x5F_vw1_x5F_wlt", "inf_x5F_vw1_x5F_web", "inf_x5F_vw1_x5F_stch", "inf_x5F_vw1_x5F_lce", "inf_x5F_open_x5F_side"];

                //Apply default fills & add to group
                self.defaultColor(p[i], el, self.sView);

                self.sView.add(el);
                self.svgSide.append(self.sView);
                self.defaultColor();
                // self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
            });

            //gloveMap values
            var gloveMap = [{ name: 'stch', x: 87.1, y: 106.1, title: 'Stitching' },
            { name: 'thbi', x: 101.4, y: 275, title: 'Thumb inner' },
            { name: 'bnd', x: 27.1, y: 265.2, title: 'Binding' },
            { name: 'lce', x: 196, y: 15, title: 'Lacing' }
            ];

        });

    };

    loadInfield2Welt() {
        let self = this;

        Snap.load("assets/images/infield_dwelt_back.svg", (f) => {
            this.svgMain.attr({ viewBox: "0 0 400 400" });

            var g = f.selectAll('#inf_x5F_vw3_x5F_bfg, #inf_x5F_vw3_x5F_mid, #inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_lce, #inf_x5F_dwelt_x5F_back, #inf_x5F_vw3_x5F_rse, inf_x5F_vw3_x5F_elt, inf_x5F_elite_x5F_logo, inf_x5F_rise_x5F_logo');
            g.forEach((el, i) => {
                var p = ["inf_x5F_vw3_x5F_bfg", "inf_x5F_vw3_x5F_mid", "inf_x5F_vw3_x5F_wst", "inf_x5F_vw3_x5F_wlt", "inf_x5F_vw3_x5F_bnd", "inf_x5F_vw3_x5F_logo", "inf_x5F_vw3_x5F_web", "inf_x5F_vw3_x5F_plm", "inf_x5F_vw3_x5F_stch", "inf_x5F_vw3_x5F_lce", "inf_x5F_dwelt_x5F_back","inf_x5F_vw3_x5F_rse", "inf_x5F_vw3_x5F_elt", "inf_x5F_elite_x5F_logo", "inf_x5F_rise_x5F_logo"];
                var layer = p[i];
                var filter = layer.split('_').pop();

                //Apply default fills & add to group
                //self.defaultColor(layer, el, self.oView);

                if (filter === "rise" || filter === "elite") {
                    el.attr({ opacity: 0 })
                    this.setSeriesOnGlove(filter, el);
                }

                self.oView.add(el);
                self.svgMain.append(self.oView);
                self.defaultColor();
                // self.gloveCloneMainVertical.append(self.svgMain.clone(self.oView));
            });

        });

        Snap.load("assets/images/9P_infield_dwelt_pocket.svg", (f) => {
            this.svgInside.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_mid, #inf_x5F_vw2_x5F_bfg, #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_bnd,#inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_lce, #inf_x1F__x5F_dwelt_x5F_inside');
            g.forEach((el, i) => {
                var p = ["inf_x5F_vw2_x5F_web", "inf_x5F_vw2_x5F_plm", "inf_x5F_vw2_x5F_mid", "inf_x5F_vw2_x5F_bfg", "inf_x5F_vw2_x5F_wlt", "inf_x5F_vw2_x5F_bnd", "inf_x5F_vw2_x5F_stch", "inf_x5F_vw2_x5F_lce", "inf_x1F__x5F_dwelt_x5F_inside"];
                var layer = p[i];

                //Apply default fills & add to group
                self.defaultColor(layer, el, this.iView);

                self.iView.add(el);
                self.svgInside.append(this.iView);
                self.defaultColor();

            });
        });

        Snap.load("assets/images/infield_dwelt_side.svg", (f) => {
            this.svgSide.attr({ viewBox: "0 0 400 400" });
            // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
            var g = f.selectAll('#inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bfg, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_stch, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_lce, #inf_x5F_vw1_x5F_logo, #inf_x5F_dwelt_x5F_side');

            g.forEach((el, i) => {
                var p = ["inf_x5F_vw1_x5F_plm", "inf_x5F_vw1_x5F_bfg", "inf_x5F_vw1_x5F_mid", "inf_x5F_vw1_x5F_wlt", "inf_x5F_vw1_x5F_web", "inf_x5F_vw1_x5F_wst", "inf_x5F_vw1_x5F_stch", "inf_x5F_vw1_x5F_bnd", "inf_x5F_vw1_x5F_lce", "inf_x5F_vw1_x5F_logo, inf_x5F_dwelt_x5F_side"];

                //Apply default fills & add to group
                self.defaultColor(p[i], el, self.sView);

                self.sView.add(el);
                self.svgSide.append(self.sView);
                self.defaultColor();
                
            });

        });

    };

    //** Loads first base mitt canvas */
    loadFbase() {
        let self = this;

        Snap.load("assets/images/fbase_back_view.svg", function (f) {
            self.svgMain.attr({ viewBox: "0 0 400 400" });
            // self.gloveCloneMainVertical.attr({viewBox:"0 0 400 400"});
            var g = f.selectAll('#fbase_x5F_vw3_x5F_thb, #fbase_x5F_vw3_x5F_bfg, #fbase_x5F_vw3_x5F_plm, #fbase_x5F_vw3_x5F_utoe, #fbase_x5F_vw3_x5F_wst, #fbase_x5F_vw3_x5F_logo, #fbase_x5F_vw3_x5F_web, #fbase_x5F_vw3_x5F_stch, #fbase_x5F_vw3_x5F_bnd, #fbase_x5F_vw3_x5F_lce, #fbase_x5F_vw3_x5F_rse, #fbase_x5F_vw3_x5F_elt, #fbase_x5F_open_x5F_back, #fbase_x5F_logo_x5F_elite, #fbase_x5F_logo_x5F_rise');
            g.forEach(function (el, i) {
                var p = ["fbase_x5F_vw3_x5F_thb", "fbase_x5F_vw3_x5F_bfg", "fbase_x5F_vw3_x5F_plm", "fbase_x5F_vw3_x5F_utoe", "fbase_x5F_vw3_x5F_wst", "fbase_x5F_vw3_x5F_logo", "fbase_x5F_vw3_x5F_web", "fbase_x5F_vw3_x5F_stch", "fbase_x5F_vw3_x5F_bnd", "fbase_x5F_vw3_x5F_lce", "fbase_x5F_vw3_x5F_rse", "fbase_x5F_vw3_x5F_elt", "fbase_x5F_open_x5F_back", "fbase_x5F_logo_x5F_elite", "fbase_x5F_logo_x5F_rise"];
                var layer = p[i];
                var filter = layer.split('_').pop();

                //Apply default fills & add to group
                self.defaultColor(layer, el, self.oView);
                if (filter === "rise" || filter === "elite") {

                    el.attr({ opacity: 0 })
                    self.setSeriesOnGlove(filter, el);
                }
                self.oView.add(el);
                self.svgMain.append(self.oView);
                self.defaultColor();
                // self.gloveCloneMainVertical.append(self.svgMain.clone(self.oView));
            });

            
        });

        Snap.load("assets/images/fbase_inside_view.svg", function (f) {
            self.svgInside.attr({ viewBox: "0 0 400 400" });
            // self.gloveCloneInsideVertical.attr({viewBox:"0 0 400 400"});
            var g = f.selectAll('#fbase_x5F_vw2_x5F_plm, #fbase_x5F_vw2_x5F_bnd, #fbase_x5F_vw2_x5F_web, #fbase_x5F_vw2_x5F_stch, #fbase_x5F_vw2_x5F_lce, #fbase_x5F_open_x5F_pocket');

            g.forEach(function (el, i) {
                var p = ["fbase_x5F_vw2_x5F_plm", "fbase_x5F_vw2_x5F_bnd", "fbase_x5F_vw2_x5F_web", "fbase_x5F_vw2_x5F_stch", "fbase_x5F_vw2_x5F_lce", "fbase_x5F_open_x5F_pocket"];
                var layer = p[i];
                //Apply default fills & add to group
                self.iView.add(el);
                self.svgInside.append(self.iView);
                self.defaultColor();
            });

        });

        Snap.load("assets/images/fbase_side_view.svg", function (f) {
            self.svgSide.attr({ viewBox: "0 0 400 400" });
            // self.gloveCloneSideVertical.attr({viewBox:"0 0 400 400"});
            var g = f.selectAll('#fbase_x5F_vw1_x5F_wst, #fbase_x5F_vw1_x5F_logo, #fbase_x5F_vw1_x5F_plm, #fbase_x5F_vw1_x5F_thb, #fbase_x5F_vw1_x5F_bfg, #fbase_x5F_vw1_x5F_utoe, #fbase_x5F_vw1_x5F_web, #fbase_x5F_vw1_x5F_stch, #fbase_x5F_vw1_x5F_bnd, #fbase_x5F_vw1_x5F_lce, #fbase_x5F_side_x5F_view');

            g.forEach(function (el, i) {
                var p = ["fbase_x5F_vw1_x5F_wst", "fbase_x5F_vw1_x5F_logo", "fbase_x5F_vw1_x5F_plm", "fbase_x5F_vw1_x5F_thb", "fbase_x5F_vw1_x5F_bfg", "fbase_x5F_vw1_x5F_utoe", "fbase_x5F_vw1_x5F_web", "fbase_x5F_vw1_x5F_stch", "fbase_x5F_vw1_x5F_bnd", "fbase_x5F_vw1_x5F_lce", "fbase_x5F_side_x5F_view"];
                var layer = p[i];
                //Apply default fills & add to group
                self.sView.add(el);
                self.svgSide.append(self.sView);
                self.defaultColor();
                // self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
            });

        });
    };

}