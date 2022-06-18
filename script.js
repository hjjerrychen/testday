
const { PDFDocument, PDFName, PDFBool, PDFString, PDFTextField, StandardFonts } = PDFLib;

const TEMPLATE_DIRECTORY_URL = "https://testday.jerrychen.xyz/templates";

const state = { cache: {} };

const testSheetFileNameByCode = {
    "S1D": "Dance_STAR_1_Dance_Elements_Assessment_Sheets_EN_NEW.pdf",
    "S2aD": "Dance_STAR 2A Dance_Dutch Waltz_Assessment_Sheets_EN.pdf",
    "S2bD": "Dance_STAR 2B Dance_Canasta Tango_Assessment_Sheets_EN.pdf",
    "S3aD": "Dance_STAR 3A Dance_Baby Blues_Assessment_Sheets_EN.pdf",
    "S3bD": "Dance_STAR_3B_Dance_Elements_Assessment_Sheets_EN_NEW.pdf",
    "S4aD-F": "Dance_STAR 4A Dance_Swing DanceFOLLOW_Assessment_Sheets_EN.pdf",
    "S4aD-L": "Dance_STAR 4A Dance_Swing DanceLEAD_Assessment_Sheets_EN.pdf",
    "S4bD": "Dance_STAR 4B Dance_Fiesta Tango_Assessment_Sheets_EN.pdf",
    "S5aD": "Dance_STAR 5A Dance_Willow Waltz_Assessment_Sheets_EN.pdf",
    "S5bD": "Dance_STAR_5B_Dance_Elements_Assessment_Sheets_EN_NEW.pdf",
    "S6AD": "Dance_STAR 6A Dance_Ten-Fox_Assessment_Sheets_EN.pdf",
    "S6BD": "Dance_STAR 6B Dance_European Waltz_Assessment_Sheets_EN.pdf",
    "S6CD": "Dance_STAR 6C Dance_Fourteenstep_Assessment_Sheets_EN.pdf",
    "S7AD": "Dance_STAR 7A Dance_Foxtrot_Assessment_Sheets_EN.pdf",
    "S7BD": "Dance_STAR 7B Dance_Tango_Assessment_Sheets_EN.pdf",
    "S7CD": "Dance_STAR 7C Dance_American Waltz_Assessment_Sheets_EN.pdf",
    "S8AD": "Dance_STAR 8A Dance_Kilian_Assessment_Sheets_EN.pdf",
    "S8AD-CH": "Dance_STAR 8A Dance_Kilian_Assessment_Sheets_EN.pdf",
    "S8BD": "Dance_STAR 8B Dance_Rocker Foxtrot_Assessment_Sheets_EN.pdf",
    "S8BD-CH": "Dance_STAR 8B Dance_Rocker Foxtrot_Assessment_Sheets_EN.pdf",
    "S8CD-F": "Dance_STAR 8C Dance_Starlight WaltzFOLLOW_Assessment_Sheets_EN.pdf",
    "S8CD-CH-F": "Dance_STAR 8C Dance_Starlight WaltzFOLLOW_Assessment_Sheets_EN.pdf",
    "S8CD-L": "Dance_STAR 8C Dance_Starlight WaltzLEAD_Assessment_Sheets_EN.pdf",
    "S8CD-CH-L": "Dance_STAR 8C Dance_Starlight WaltzLEAD_Assessment_Sheets_EN.pdf",
    "S9AD-F": "Dance_STAR 9A Dance_Paso DobleFOLLOW_Assessment_Sheets_EN.pdf",
    "S9AD-L": "Dance_STAR 9A Dance_Paso DobleLEAD_Assessment_Sheets_EN.pdf",
    "S9BD": "Dance_STAR 9B Dance_Blues_Assessment_Sheets_EN.pdf",
    "S9CD-F": "Dance_STAR 9C Dance_Silver SambaFOLLOW_Assessment_Sheets_EN_NEW.pdf",
    "S9CD-L": "Dance_STAR 9C Dance_Silver SambaLEAD_Assessment_Sheets_EN_NEW.pdf",
    "S10AD": "Dance_STAR 10A Dance_Cha Cha Congelado_Assessment_Sheets_EN.pdf",
    "S10BD-F": "Dance_STAR 10B Dance_Westminster WaltzFOLLOW_Assessment_Sheets_EN.pdf",
    "S10BD-L": "Dance_STAR 10B Dance_Westminster WaltzLEAD_Assessment_Sheets_EN.pdf",
    "S10CD": "Dance_STAR 10C Dance_Quickstep_Assessment_Sheets_EN.pdf",
    "GAD-F": "Dance_Gold A Dance_Viennese WaltzFOLLOW_Assessment_Sheets_EN.pdf",
    "GAD-CH-F": "Dance_Gold A Dance_Viennese WaltzFOLLOW_Assessment_Sheets_EN.pdf",
    "GAD-L": "Dance_Gold A Dance_Viennese WaltzLEAD_Assessment_Sheets_EN.pdf",
    "GAD-CH-L": "Dance_Gold A Dance_Viennese WaltzLEAD_Assessment_Sheets_EN.pdf",
    "GBD-F": "Dance_Gold B Dance_Argentine TangoFOLLOW_Assessment_Sheets_EN_NEW.pdf",
    "GBD-CH-F": "Dance_Gold B Dance_Argentine TangoFOLLOW_Assessment_Sheets_EN_NEW.pdf",
    "GBD-L": "Dance_Gold B Dance_Argentine TangoLEAD_Assessment_Sheets_EN_NEW.pdf",
    "GBD-CH-L": "Dance_Gold B Dance_Argentine TangoLEAD_Assessment_Sheets_EN_NEW.pdf",
    "GCD": "Dance_Gold C Dance_Gold Rhythm Dance_Assessment_Sheets_EN.pdf",
    "GCD-CH": "Dance_Gold C Dance_Gold Rhythm Dance_Assessment_Sheets_EN.pdf",
    "RAV": "Diamond-Dance-Evaluation-Sheet-RAV-ENG.pdf",
    "AUS": "Diamond-Dance-Evaluation-Sheet-AUS-ENG.pdf",
    "TAN": "Diamond-Dance-Evaluation-Sheet-TAN-ENG.pdf",
    "GOL": "Diamond-Dance-Evaluation-Sheet-GOL-ENG.pdf",
    "YAN": "Diamond-Dance-Evaluation-Sheet-YAN-ENG.pdf",
    "RHU": "Diamond-Dance-Evaluation-Sheet-RHU-ENG.pdf",
    "S1S": "Skills_Assessment_STAR1_EN.pdf",
    "S2S": "Skills_Assessment_STAR2_EN.pdf",
    "S3S": "Skills_Assessment_STAR3_EN.pdf",
    "S4S": "Skills_Assessment_STAR4_EN.pdf",
    "S5S": "Skills_Assessment_STAR5_EN.pdf",
    "S6S": "Skills_Assessment_STAR6_EN.pdf",
    "S7S": "Skills_Assessment_STAR7_EN.pdf",
    "S8S": "Skills_Assessment_STAR8_EN.pdf",
    "S9S": "Skills_Assessment_STAR9_EN.pdf",
    "S10S": "Skills_Assessment_STAR10_EN.pdf",
    "GS": "Skills_Assessment_GOLD_EN.pdf",
    "S5A": "Artistic_Assessments_Star5_EN_-_Apr_2020_v8.pdf",
    "S7A": "Artistic_Assessments_Star7_EN_-_Apr_2020_v8.pdf",
    "S9A": "Artistic_Assessments_Star9_EN_-_Apr_2020_v8.pdf",
    "GA": "Artistic_Assessments_Gold_EN_-_Apr_2020_v8.pdf",
    "S1FS": "Freeskate_Elements_Star1_EN.pdf",
    "S2FSE": "Freeskate_Elements_Star2_EN.pdf",
    "S2FSP": "Freeskate_Program_STAR2_EN.pdf",
    "S3FSE": "Freeskate_Elements_Star3_EN.pdf",
    "S3FSP": "Freeskate_Program_STAR3_EN.pdf",
    "S4FSE": "Freeskate_Elements_Star4_EN.pdf",
    "S4FSP": "Freeskate_Program_STAR4_EN.pdf",
    "S5FSE": "Freeskate_Elements_Star5_EN.pdf",
    "S5FSP": "Freeskate_Program_STAR5_EN.pdf",
    "S6FSE": "Freeskate_Elements_Star6_EN.pdf",
    "S6FSP": "Freeskate_Program_STAR6_EN.pdf",
    "S7FSE": "Freeskate_Elements_Star7_EN.pdf",
    "S7FSP": "Freeskate_Program_STAR7_EN.pdf",
    "S8FSE": "Freeskate_Elements_Star8_EN.pdf",
    "S8FSP": "Freeskate_Program_STAR8_EN.pdf",
    "S9FSE": "Freeskate_Elements_Star9_EN.pdf",
    "S9FSP": "Freeskate_Program_STAR9_EN.pdf",
    "S10FSE": "Freeskate_Elements_Star10_EN.pdf",
    "S10FSE-CH": "Freeskate_Elements_Star10_EN.pdf",
    "S10FSP": "Freeskate_Program_STAR10_EN.pdf",
    "GFSP": "Freeskate_Program_GOLD_EN.pdf",
    "GFSP-CH": "Freeskate_Program_GOLD_EN.pdf",
    "SYS2": "Synchro_Assessment_STAR2_EN.pdf",
    "SYS3": "Synchro_Assessment_STAR3_EN.pdf",
    "SYS4": "Synchro_Assessment_STAR4_EN.pdf"
};

window.onload = main;

function main() {
    const eventNameField = document.querySelector("#eventName");
    eventNameField.oninput = clearSummaryCache;
    const normalAssessmentFeeField = document.querySelector("#normalAssessmentFee");
    normalAssessmentFeeField.oninput = clearSummaryCache;
    const challengeAssessmentFeeField = document.querySelector("#challengeAssessmentFee");
    challengeAssessmentFeeField.oninput = clearSummaryCache;


    const organizationNameField = document.querySelector("#organizationName");
    organizationNameField.oninput = () => state.cache = {};
    const organizationSkateCanadaNumberField = document.querySelector("#organizationSkateCanadaNumber");
    organizationSkateCanadaNumberField.oninput = clearSummaryCache;

    const assessmentCoordinatorNameField = document.querySelector("#assessmentCoordinatorName");
    assessmentCoordinatorNameField.oninput = clearSummaryCache;

    const assessmentCoordinatorSkateCanadaNumberField = document.querySelector("#assessmentCoordinatorSkateCanadaNumber");
    assessmentCoordinatorSkateCanadaNumberField.oninput = clearSummaryCache;

    const assessmentCoordinatorPhoneField = document.querySelector("#assessmentCoordinatorPhone");
    assessmentCoordinatorPhoneField.oninput = clearSummaryCache;

    const assessmentCoordinatorEmailField = document.querySelector("#assessmentCoordinatorEmail");
    assessmentCoordinatorEmailField.oninput = clearSummaryCache;

    const generateAssessmentSheetsButtonGroup = document.querySelector("#generateAssessmentSheetsButtonGroup");
    const generateAssessmentSheetsButton = document.querySelector("#generateAssessmentSheets");

    async function generateAssessmentSheets(cacheKey, filter) {
        new bootstrap.Dropdown(document.querySelector('#generateAssessmentSheets')).hide()
        if (!state.entries) {
            generateAssessmentSheetsButtonGroup.classList.add("is-invalid");
            return;
        }
        buttonLoading(generateAssessmentSheetsButton);
        if (state.cache?.[cacheKey]) {
            window.open(state.cache[cacheKey]);
        }
        else {
            await generateTestSheets(filter(state.entries.filter(entry => entry.result !== "W")), organizationNameField.value, cacheKey);
        }
        restoreButton(generateAssessmentSheetsButton);
    }

    const allAssessmentSheetsButton = document.querySelector("#allAssessmentSheets");
    allAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("all", entries => entries.filter(() => true)));

    const artisticAssessmentSheetsButton = document.querySelector("#artisticAssessmentSheets");
    artisticAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("artistic", entries => entries.filter(entry => testCodeWithoutChallenge(entry.test_code).endsWith("A") && !isDiamondDance(testCodeWithoutChallenge(entry.test_code)))));

    const danceAssessmentSheetsButton = document.querySelector("#danceAssessmentSheets");
    danceAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("dance", entries => entries.filter(entry => testCodeWithoutChallenge(entry.test_code).endsWith("D") || isDiamondDance(testCodeWithoutChallenge(entry.test_code)))));

    const freeskateAssessmentSheetsButton = document.querySelector("#freeskateAssessmentSheets");
    freeskateAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("freeskate", entries => entries.filter(entry => (testCodeWithoutChallenge(entry.test_code).endsWith("FS") || testCodeWithoutChallenge(entry.test_code).endsWith("FSE") || testCodeWithoutChallenge(entry.test_code).endsWith("FSP")) && !isDiamondDance(testCodeWithoutChallenge(entry.test_code)))));

    const skillsAssessmentSheetsButton = document.querySelector("#skillsAssessmentSheets");
    skillsAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("skills", entries => entries.filter(entry => testCodeWithoutChallenge(entry.test_code).endsWith("S") && !testCodeWithoutChallenge(entry.test_code).endsWith("FS") && !isDiamondDance(testCodeWithoutChallenge(entry.test_code)))));

    const synchroAssessmentSheetsButton = document.querySelector("#synchroAssessmentSheets");
    synchroAssessmentSheetsButton.addEventListener("click", async () => generateAssessmentSheets("synchro", entries => entries.filter(entry => testCodeWithoutChallenge(entry.test_code).startsWith("SYS") && !isDiamondDance(testCodeWithoutChallenge(entry.test_code)))));

    const generateAssessmentSummarySheetButton = document.querySelector("#generateAssessmentSummarySheet");
    generateAssessmentSummarySheetButton.addEventListener("click", async event => {
        const cacheKey = "summary";

        if (!state.entries) {
            generateAssessmentSummarySheetButton.classList.add("is-invalid");
            return;
        }
        buttonLoading(generateAssessmentSummarySheetButton);
        if (state.cache?.[cacheKey]) {
            window.open(state.cache[cacheKey]);
        }
        else {
            await generateTestSummarySheets(state.entries, eventNameField.value, parseFloat(normalAssessmentFeeField.value), parseFloat(challengeAssessmentFeeField.value),
                organizationNameField.value, organizationSkateCanadaNumberField.value, assessmentCoordinatorNameField.value,
                assessmentCoordinatorSkateCanadaNumberField.value, assessmentCoordinatorPhoneField.value, assessmentCoordinatorEmailField.value, cacheKey);
        }
        restoreButton(generateAssessmentSummarySheetButton);

    });


    const filePicker = document.querySelector("#csv");

    filePicker.addEventListener("click", () => {
        filePicker.value = "";
        delete state.entries;
        state.cache = {};
        filePicker.classList.remove("is-invalid");
        filePicker.classList.remove("is-valid");
        generateAssessmentSheetsButtonGroup.classList.remove("is-invalid");
        generateAssessmentSummarySheetButton.classList.remove("is-invalid");
    })

    filePicker.addEventListener("change", async event => {
        const fileList = event.target.files;
        const data = await parseCsv(fileList[0])
        if (data.errors.length > 0) {
            filePicker.classList.add("is-invalid");
            return;
        }
        state.entries = data.data;

        document.querySelector("#verifyUploadModalTableRowCount").innerHTML = `${state.entries.length} rows detected`;

        let verifyUploadModalTableBodyHTML = "";

        const resultBadgeHTML = {
            "H": `<span class="badge bg-success">Honours</span>`,
            "P": `<span class="badge bg-success">Pass</span>`,
            "R": `<span class="badge bg-danger">Retry</span>`,
            "W": `<span class="badge bg-dark">Withdrawn</span>`,
            "": `<span class="badge bg-secondary">Unknown</span>`
        }

        const idSet = new Set();
        let fileFormatError = false;
        let fileFormatWarning = false;


        for (const [index, entry] of state.entries.entries()) {

            const lead = entry.lead === "true" || entry.lead === "TRUE" ? "Lead" : entry.lead === "false" || entry.lead === "FALSE" ? "Follow" : "";
            const sc_submitted = entry.sc_submitted === "true" || entry.sc_submitted === "TRUE" ? `<i class="bi bi-check-lg"></i>` : `<i class="bi bi-x-lg"></i>`;

            const validTestCode = entry.test_code in testSheetFileNameByCode || `${entry.test_code}-L` in testSheetFileNameByCode || `${entry.test_code}-F` in testSheetFileNameByCode;
            const validLeadValue = ["TRUE", "true", "FALSE", "false", ""].includes(entry.lead);
            const validLeadValueForTestCode = (entry.test_code in testSheetFileNameByCode && entry.lead === "" && !isDiamondDance(entry.test_code)) ||
                ((isDiamondDance(entry.test_code) || `${entry.test_code}-F` in testSheetFileNameByCode || `${entry.test_code}-L` in testSheetFileNameByCode) && entry.lead !== "");
            const validResult = ["", "P", "H", "R", "W"].includes(entry.result);
            const entryError = !(entry.result in resultBadgeHTML && validTestCode && validLeadValue && validLeadValueForTestCode && validResult);

            const formFieldsEmpty = (entry.id && entry.date && entry.name && entry.sc_num && entry.assessor_name && entry.assessor_sc_num && entry.home_org && entry.home_org_sc_num) === "" || idSet.has(entry.id);
            const entryWarning = isDiamondDance(entry.test_code) ? formFieldsEmpty || (entry.partner && entry.coach) === "" : formFieldsEmpty;

            idSet.add(entry.id);

            if (entryError) {
                fileFormatError = true;
            }

            if (entryWarning) {
                fileFormatWarning = true;
            }

            verifyUploadModalTableBodyHTML += `
                <tr class=${entryError ? "table-danger" : entryWarning ? "table-warning" : ""}>
                  <th scope="row">${index + 1}</th>
                  <td>${entry.id}</td>
                  <td>${entry["date(dd/mm/yyyy)"]}</td>
                  <td>
                    ${entry.name} <small class="text-muted">${entry.sc_num}</small>
                  </td>
                  <td>
                    ${entry.home_org} <small class="text-muted">${entry.home_org_sc_num}</small>
                  </td>
                  <td>${entry.test_code} <small class="text-muted">${lead}</small></td>
                  <td>${resultBadgeHTML[entry.result] ?? ""}</td>
                  <td>
                    ${entry.assessor_name} <small class="text-muted">${entry.assessor_sc_num}</small>
                  </td>
                  <td class="text-center">${sc_submitted}</td>
                  <td>${entry.coach}</td>
                  <td>${entry.partner}</td>
                </tr>
            `
        }

        document.querySelector("#verifyUploadModalTableBody").innerHTML = verifyUploadModalTableBodyHTML;

        const options = { "backdrop": true, "keyboard": true, "focus": true }
        var verifyUploadModal = new bootstrap.Modal(document.getElementById('verifyUploadModal'), options);
        verifyUploadModal.show();

        if (fileFormatWarning) {
            document.querySelector("#verifyDataWarning").classList.remove("d-none");
        }

        if (fileFormatError) {
            delete state.entries;
            state.cache = {};
            document.querySelector("#verifyDataError").classList.remove("d-none");
            filePicker.classList.add("is-invalid");
        }
        else {
            filePicker.classList.add("is-valid");
        }
    });

};

function clearSummaryCache() {
    delete state.cache.summary;
}

function testCodeWithoutChallenge(testCode) {
    return testCode.substring(0, testCode.lastIndexOf('-')).trim() || testCode
}

function isDiamondDance(testCode) {
    return testSheetFileNameByCode[testCode]?.includes("Diamond-Dance");
}

function buttonLoading(button) {
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...`;
}

function restoreButton(button) {
    button.disabled = false;
    button.replaceChildren("Export PDF");
}

async function parseCsv(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transform: (value) => {
                return value.trim();
            },
            complete: (results) => {
                return resolve(results);
            },
            error: (error) => {
                return reject(error);
            },
        });
    });
}

async function generateTestSheets(entries, host_org_name, cacheKey) {
    const testSheets = await PDFDocument.create();
    for (const entry of entries) {
        const testSheet = await generateTestSheet(entry, host_org_name)
        const copiedTestSheetPages = await testSheets.copyPages(testSheet, testSheet.getPageIndices())
        for (const page of copiedTestSheetPages) {
            testSheets.addPage(page)
        }
    }
    testSheets.getForm().acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.True)


    const file = new Blob([await testSheets.save()], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    if (cacheKey) {
        state.cache[cacheKey] = fileURL;
    }
    window.open(fileURL);
}

async function generateTestSheet(entry, host_org_name) {
    const { id, test_code, name: candidate_name, sc_num: candidate_sc_num, assessor_name, assessor_sc_num, lead,
        "date(dd/mm/yyyy)": date, home_org: candidate_home_org_name, coach: coach_name, partner: partner_name, ...rest } = entry;
    let fileName = testSheetFileNameByCode[test_code];
    if (fileName?.includes("Diamond-Dance")) {
        if (!lead) {
            throw Error(`Missing lead/follow property for entry \n${Object.values(entry)}`);
        }

        return generateDiamondDanceSheet(id, fileName, date, candidate_name, assessor_name, candidate_home_org_name, host_org_name, coach_name, partner_name, lead);
    }

    if (!testSheetFileNameByCode[test_code]) {
        if (lead === "true" || lead === "TRUE") {
            fileName = testSheetFileNameByCode[`${test_code}-L`]
        }
        else if (lead === "false" || lead == "false") {
            fileName = testSheetFileNameByCode[`${test_code}-F`]
        }
        else {
            throw Error(`Incorrect test code and/or lead property for entry\n${Object.values(entry)}`);
        }
    }

    return generateNormalTestSheet(id, fileName, date, candidate_name, candidate_sc_num, assessor_name, candidate_home_org_name);
};

async function generateDiamondDanceSheet(id, form_location, date, candidate_name, assessor_name, candidate_home_org_name, host_org_name, coach_name, partner_name, lead = false) {
    const testSheet = await fetch(`${TEMPLATE_DIRECTORY_URL}/${form_location}`)
    const testSheetArrayBuffer = await testSheet.arrayBuffer()
    const testSheetPDF = await PDFDocument.load(testSheetArrayBuffer)
    const testSheetPDFForm = testSheetPDF.getForm()

    // add id to top right
    const font = await testSheetPDF.embedFont(StandardFonts.CourierBold);
    const size = 11;

    const firstPage = testSheetPDF.getPages()[0]
    const { width: pageWidth, height: pageHeight } = firstPage.getSize()

    firstPage.drawText(`#${id}`, {
        x: pageWidth * 0.08,
        y: pageHeight * 0.95,
        size,
        font
    })

    // set date
    testSheetPDFForm.getTextField('test_date').setText(date.split('/').join(''));

    // set host org
    testSheetPDFForm.getTextField('org_name').setText(host_org_name);

    // set candidate
    testSheetPDFForm.getTextField('candidate').setText(candidate_name);

    // set candidate's home club
    testSheetPDFForm.getTextField("home_org").setText(candidate_home_org_name);

    // set candidate's coach
    testSheetPDFForm.getTextField("coach").setText(coach_name);

    // set candidate's partner
    testSheetPDFForm.getTextField("partner").setText(partner_name);

    // set assessor
    testSheetPDFForm.getTextField('evaluator').setText(assessor_name);

    // set steps (lead/follow)
    testSheetPDFForm.getTextField('steps').setText(lead === 'true' ? "Lead" : lead === 'false' ? "Follow" : "");

    // rename fields with id
    const testSheetPDFFormFields = testSheetPDFForm.getFields()
    testSheetPDFFormFields.forEach(field => {
        field.acroField.dict.set(PDFName.of("T"), PDFString.of(`${id}_${field.getName()}`))
    });

    return testSheetPDF;
};

async function generateNormalTestSheet(id, form_location, date, candidate_name, candidate_sc_num, assessor_name, candidate_home_org_name) {
    const testSheet = await fetch(`${TEMPLATE_DIRECTORY_URL}/${form_location}`)
    const testSheetArrayBuffer = await testSheet.arrayBuffer()
    const testSheetPDF = await PDFDocument.load(testSheetArrayBuffer)
    const testSheetPDFForm = testSheetPDF.getForm()

    // clear and rename fields with id
    const testSheetPDFFormFields = testSheetPDFForm.getFields()
    testSheetPDFFormFields.forEach(field => {
        if (field instanceof PDFTextField) {
            testSheetPDFForm.getTextField(field.getName()).setText("")
        }
        field.acroField.dict.set(PDFName.of("T"), PDFString.of(`${id}_${field.getName()}`))
    });

    // add id to top left
    const font = await testSheetPDF.embedFont(StandardFonts.CourierBold);
    const size = 11;
    const textWidth = font.widthOfTextAtSize(`#${id}`, size);

    const firstPage = testSheetPDF.getPages()[0]
    const { width: pageWidth, height: pageHeight } = firstPage.getSize()

    firstPage.drawText(`#${id}`, {
        x: (pageWidth * 0.95) - textWidth,
        y: pageHeight * 0.95,
        size,
        font
    })

    // set date
    date = date.split("/")

    // day
    testSheetPDFForm.getTextField(`${id}_untitled1`).setText(date[0])
    testSheetPDFForm.getTextField(`${id}_untitled8`).setText(date[0])

    // month
    testSheetPDFForm.getTextField(`${id}_untitled2`).setText(date[1])
    testSheetPDFForm.getTextField(`${id}_untitled9`).setText(date[1])

    // year
    testSheetPDFForm.getTextField(`${id}_untitled3`).setText(date[2])
    testSheetPDFForm.getTextField(`${id}_untitled10`).setText(date[2])

    // set candidate
    testSheetPDFForm.getTextField(`${id}_untitled4`).setText(candidate_name)
    testSheetPDFForm.getTextField(`${id}_untitled11`).setText(candidate_name)

    // set candidate's home club
    testSheetPDFForm.getTextField(`${id}_untitled6`).setText(candidate_home_org_name)

    // set candidate's sc_num
    testSheetPDFForm.getTextField(`${id}_untitled5`).setText(candidate_sc_num)

    // set assessor
    testSheetPDFForm.getTextField(`${id}_untitled7`).setText(assessor_name)
    testSheetPDFForm.getTextField(`${id}_untitled12`).setText(assessor_name)

    return testSheetPDF;
};


async function generateTestSummarySheets(entries, title, normal_test_fee, challenge_test_fee, org_name, org_sc_num,
    assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email, cacheKey) {

    const combinedTestSummarySheets = await PDFDocument.create();

    const normalTests = entries.filter(entry => !entry["test_code"].includes("-CH") && !entry["test_code"].includes("- CH"));
    const challengeTests = entries.filter(entry => entry["test_code"].includes("-CH") || entry["test_code"].includes("- CH"));

    const totalPagesNormalTests = Math.ceil(normalTests.length / 10.0);
    const totalPagesChallengeTests = Math.ceil(challengeTests.length / 10.0);
    const totalPages = totalPagesNormalTests + totalPagesChallengeTests;
    const entriesPerPage = 10;

    for (let i = 0; i < normalTests.length; i += entriesPerPage) {
        const entriesForTestSummarySheet = normalTests.slice(i, i + entriesPerPage)
        const testSummarySheet = await generateTestSummarySheet(entriesForTestSummarySheet, normal_test_fee, (i + 10) / 10, totalPages, title, org_name, org_sc_num,
            assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email)
        const copiedTestSummarySheetPages = await combinedTestSummarySheets.copyPages(testSummarySheet, [0])
        for (const page of copiedTestSummarySheetPages) {
            combinedTestSummarySheets.addPage(page)
        }
    }

    for (let i = 0; i < challengeTests.length; i += entriesPerPage) {
        const entriesForTestSummarySheet = challengeTests.slice(i, i + entriesPerPage)
        const testSummarySheet = await generateTestSummarySheet(entriesForTestSummarySheet, challenge_test_fee, (totalPagesNormalTests * 10 + i + 10) / 10, totalPages, title, org_name, org_sc_num,
            assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email)
        const copiedTestSummarySheetPages = await combinedTestSummarySheets.copyPages(testSummarySheet, [0])
        for (const page of copiedTestSummarySheetPages) {
            combinedTestSummarySheets.addPage(page)
        }
    }
    combinedTestSummarySheets.getForm().acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.True)

    const file = new Blob([await combinedTestSummarySheets.save()], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    if (cacheKey) {
        state.cache[cacheKey] = fileURL;
    }
    window.open(fileURL);
};

async function generateTestSummarySheet(entries, test_fee, page_num, total_pages, title, org_name, org_sc_num,
    assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email) {

    const assessmentSummarySheet = await fetch(`${TEMPLATE_DIRECTORY_URL}/Test_Summary_Sheet_Jul_2020.pdf`)
    const assessmentSummarySheetArrayBuffer = await assessmentSummarySheet.arrayBuffer();
    const accessmentSummarySheetPDF = await PDFDocument.load(assessmentSummarySheetArrayBuffer)
    const accessmentSummarySheetForm = accessmentSummarySheetPDF.getForm()

    accessmentSummarySheetForm.getTextField("untitled1").setText(org_name)
    accessmentSummarySheetForm.getTextField("untitled2").setText(org_sc_num)
    accessmentSummarySheetForm.getTextField("untitled3").setText(assessment_coordinator_sc_num)
    accessmentSummarySheetForm.getTextField("untitled4").setText(assessment_coordinator_name)
    accessmentSummarySheetForm.getTextField("untitled5").setText(assessment_coordinator_phone)
    accessmentSummarySheetForm.getTextField("untitled6").setText(assessment_coordinator_email)

    // input each test
    for (const [testCount, entry] of entries.entries()) {
        const { id, test_code, result, name: candidate_name, sc_num: candidate_sc_num, assessor_name, assessor_sc_num, "date(dd/mm/yyyy)": date,
            home_org: candidate_home_org_name, home_org_sc_num: candidate_home_org_name_sc_num, ...rest } = entry;

        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) * 2 + 7}`).setText(candidate_sc_num)
        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) * 2 + 8}`).setText(candidate_name)
        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) * 2 + 27}`).setText(candidate_home_org_name)
        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) * 2 + 28}`).setText(candidate_home_org_name_sc_num)
        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) + 88}`).setText(`${test_code}  (#${id})`)
        accessmentSummarySheetForm.getTextField(`untitled${66 - (testCount % 10) * 2}`).setText(assessor_sc_num)
        accessmentSummarySheetForm.getTextField(`untitled${65 - (testCount % 10) * 2}`).setText(assessor_name)
        accessmentSummarySheetForm.getTextField(`untitled${87 - (testCount % 10) * 2}`).setText(date)
        accessmentSummarySheetForm.getTextField(`untitled${86 - (testCount % 10) * 2}`).setText((Math.round(test_fee * 100) / 100).toFixed(2))

        if (entry["result"] === "P") {
            accessmentSummarySheetForm.getCheckBox(`untitled${127 - (testCount % 10) * 3}`).check()
        }
        else if (entry["result"] === "R") {
            accessmentSummarySheetForm.getCheckBox(`untitled${127 - (testCount % 10) * 3 - 1}`).check()
        }
        else if (entry["result"] === "H") {
            accessmentSummarySheetForm.getCheckBox(`untitled${127 - (testCount % 10) * 3 - 2}`).check()
        }
    }

    // fill in price
    accessmentSummarySheetForm.getTextField("untitled67").setText((Math.round(entries.length * test_fee * 100) / 100).toFixed(2))

    // add page number to top right
    const font = await accessmentSummarySheetPDF.embedFont(StandardFonts.CourierBold);
    const size = 9;
    const firstPage = accessmentSummarySheetPDF.getPages()[0]
    const { width: pageWidth, height: pageHeight } = firstPage.getSize()
    const lineHeight = font.heightAtSize(size + 3)
    firstPage.drawText(`${title}`, {
        x: pageWidth * 0.085,
        y: pageHeight * 0.88,
        size,
        font
    })
    firstPage.drawText(`Page ${page_num} of ${total_pages}`, {
        x: pageWidth * 0.085,
        y: pageHeight * 0.88 - lineHeight,
        size,
        font
    })

    // rename fields with id
    const accessmentSummarySheetFormFields = accessmentSummarySheetForm.getFields()
    accessmentSummarySheetFormFields.forEach(field => {
        field.acroField.dict.set(PDFName.of("T"), PDFString.of(`${page_num}_${field.getName()}`))
    });

    return accessmentSummarySheetPDF;
};