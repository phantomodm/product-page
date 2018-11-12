export function loadCatcherFB() {
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
export function loadOutfield() {
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

        //gloveMap and indicator
        var gloveMap = [{ name: "plm", x: 201, y: 215, title: "palm" },
        { name: "web", x: 102, y: 133, title: "web" },
        { name: "pnki", x: 350, y: 111.5, title: "pinky inner" },
        { name: "thbo", x: 84, y: 236, title: "Thumb Outer" },
        ];

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