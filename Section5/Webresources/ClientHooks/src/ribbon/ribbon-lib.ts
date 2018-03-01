namespace sf365.Ribbon {
    export class Encoding {
        static xmlEncode(text: string): string {
            if (text == null || text === "") {
                return text;
            }

            return Xrm.Encoding.xmlEncode(text);
        }
    }

    export class RibbonControl {
        id: string;
        labelText: string;
        sequence: number;
        command: string;
        image16By16: string;
        image32By32: string;

        constructor(id: string,
            sequence: number,
            labelText: string,
            command: string,
            image16: string,
            image32: string) {
            this.id = id;
            this.sequence = sequence;
            this.labelText = labelText;
            this.command = command;
            this.image16By16 = image16;
            this.image32By32 = image32;
        }

        serialiseToRibbonXml(sb: string[]): void {

        }
    }
    export class RibbonFlyoutAnchor extends RibbonControl {
        menu: RibbonMenu;
        serialiseToRibbonXml(sb: string[]): void {
            sb.push(`<FlyoutAnchor Id="${Encoding.xmlEncode(this.id)}" LabelText="${Encoding.xmlEncode(this.labelText)}" Sequence="${this.sequence.toString()}" Command="${Encoding.xmlEncode(this.command)}"${(this.image32By32 != null) ? (` Image32by32="${Encoding.xmlEncode(this.image32By32)}"`) : ""}${(this.image16By16 != null) ? (` Image16by16="${Encoding.xmlEncode(this.image16By16)}"`) : ""} PopulateDynamically="false">`);
            sb.push(this.menu.serialiseToRibbonXml());
            sb.push("</FlyoutAnchor>");
        }
    }
   

    export class RibbonButton extends RibbonControl {
        serialiseToRibbonXml(sb: string[]): void {
            sb.push(`<Button Id="${Encoding.xmlEncode(this.id)}" LabelText="${Encoding.xmlEncode(this.labelText)}" Sequence="${this.sequence.toString()}" Command="${Encoding.xmlEncode(this.command)}"${(this.image32By32 != null) ? (` Image32by32="${Encoding.xmlEncode(this.image32By32)}"`) : ""}${(this.image16By16 != null) ? (` Image16by16 ="${Encoding.xmlEncode(this.image16By16)}"`) : ""} />`);
        }
    }

    export class RibbonMenu {
        constructor(id: string) {
            this.id = id;
        }
        id: string;
        sections = new Array<RibbonMenuSection>();
        serialiseToRibbonXml(): string {
            var sb = new Array<string>();
            sb.push(`<Menu Id="${this.id}">`);
            this.sections.forEach(section => {
                section.serialiseToRibbonXml(sb);
            });
            sb.push("</Menu>");
            return sb.join("");
        }
        addSection(section: RibbonMenuSection): RibbonMenu {
            this.sections.push(section);
            return this;
        }
    }

    export class RibbonMenuSection {
        constructor(id: string, labelText: string, sequence: number, displayMode: RibbonDisplayMode) {
            this.id = id;
            this.title = labelText;
            this.sequence = sequence;
            this.displayMode = displayMode;
        }
        id: string;
        title: string;
        sequence: number;
        displayMode: RibbonDisplayMode;
        buttons = new Array<RibbonControl>();
        serialiseToRibbonXml(sb: string[]): void {
            sb.push(`<MenuSection Id="${Encoding.xmlEncode(this.id)}${this.title != null ? `" Title="${this.title.toString()}` : ""}" Sequence="${this.sequence.toString()}" DisplayMode="${this.displayMode}">`);
            sb.push(`<Controls Id="${Encoding.xmlEncode(this.id + ".Controls")}">`);
            this.buttons.forEach(button => {
                button.serialiseToRibbonXml(sb);
            });
            sb.push("</Controls>");
            sb.push("</MenuSection>");
        }
        addButton(button: RibbonControl): RibbonMenuSection {
            this.buttons.push(button);
            return this;
        }
    }

    export class CommandProperties {
        PopulationXML: string | Promise<string>;
        SourceControlId: string;
    }

    export type RibbonDisplayMode =
        "Menu16" |
        "Menu32";
}