
const { PDFDocument, PDFName, PDFBool, PDFString, PDFTextField, StandardFonts } = PDFLib;

const TEMPLATE_DIRECTORY_URL = "https://testday.jerrychen.xyz/templates";

const state = { cache: {} };

const testSheetFileNameByCode = {
    "S1D": "STAR 1 Dance - Elements.pdf",
    "S2aD": "STAR 2A Dance - Dutch Waltz.pdf",
    "S2bD": "STAR 2B Dance - Canasta Tango.pdf",
    "S3aD": "STAR 3A Dance - Baby Blues.pdf",
    "S3bD": "STAR 3B Dance - Elements.pdf",
    "S4aD-F": "STAR 4A Dance - Swing Dance - Follow.pdf",
    "S4aD-L": "STAR 4A Dance - Swing Dance - Lead.pdf",
    "S4bD": "STAR 4B Dance - Fiesta Tango.pdf",
    "S5aD": "STAR 5A Dance - Willow Waltz.pdf",
    "S5bD": "STAR 5B Dance - Elements.pdf",
    "S6AD": "STAR 6A Dance - Ten-Fox.pdf",
    "S6BD": "STAR 6B Dance - European Waltz.pdf",
    "S6CD": "STAR 6C Dance - Fourteenstep.pdf",
    "S7AD": "STAR 7A Dance - Foxtrot.pdf",
    "S7BD": "STAR 7B Dance - Tango.pdf",
    "S7CD": "STAR 7C Dance - American Waltz.pdf",
    "S8AD": "STAR 8A Dance - Kilian.pdf",
    "S8AD-CH": "STAR 8A Dance - Kilian.pdf",
    "S8BD": "STAR 8B Dance - Rocker Foxtrot.pdf",
    "S8BD-CH": "STAR 8B Dance - Rocker Foxtrot.pdf",
    "S8CD-F": "STAR 8C Dance - Starlight Waltz - Follow.pdf",
    "S8CD-CH-F": "STAR 8C Dance - Starlight Waltz - Follow.pdf",
    "S8CD-L": "STAR 8C Dance - Starlight Waltz - Lead.pdf",
    "S8CD-CH-L": "STAR 8C Dance - Starlight Waltz - Lead.pdf",
    "S9AD-F": "STAR 9A Dance - Paso Doble - Follow.pdf",
    "S9AD-L": "STAR 9A Dance - Paso Doble - Lead.pdf",
    "S9BD": "STAR 9B Dance - Blues.pdf",
    "S9CD-F": "STAR 9C Dance - Silver Samba - Follow.pdf",
    "S9CD-L": "STAR 9C Dance - Silver Samba - Lead.pdf",
    "S10AD": "STAR 10A Dance - Cha Cha Congelado.pdf",
    "S10BD-F": "STAR 10B Dance - Westminster Waltz - Follow.pdf",
    "S10BD-L": "STAR 10B Dance - Westminster Waltz - Lead.pdf",
    "S10CD": "STAR 10C Dance - Quickstep.pdf",
    "GAD-F": "GOLD A Dance - Viennese - Follow.pdf",
    "GAD-CH-F": "GOLD A Dance - Viennese - Follow.pdf",
    "GAD-L": "GOLD A Dance - Viennese Waltz - Lead.pdf",
    "GAD-CH-L": "GOLD A Dance - Viennese Waltz - Lead.pdf",
    "GBD-F": "GOLD B Dance - Argentine Tango - Follow.pdf",
    "GBD-CH-F": "GOLD B Dance - Argentine Tango - Follow.pdf",
    "GBD-L": "GOLD B Dance - Argentine Tango - Lead.pdf",
    "GBD-CH-L": "GOLD B Dance - Argentine Tango - Lead.pdf",
    "GCD": "GOLD C Dance - Gold Rhythm Dance.pdf",
    "GCD-CH": "GOLD C Dance - Gold Rhythm Dance.pdf",
    "RAV": "Diamond-Dance-Evaluation-Sheet-RAV-ENG.pdf",
    "AUS": "Diamond-Dance-Evaluation-Sheet-AUS-ENG.pdf",
    "TAN": "Diamond-Dance-Evaluation-Sheet-TAN-ENG.pdf",
    "GOL": "Diamond-Dance-Evaluation-Sheet-GOL-ENG.pdf",
    "YAN": "Diamond-Dance-Evaluation-Sheet-YAN-ENG.pdf",
    "RHU": "Diamond-Dance-Evaluation-Sheet-RHU-ENG.pdf",
    "S1S": "STAR 1 - Skills.pdf",
    "S2S": "STAR 2 - Skills.pdf",
    "S3S": "STAR 3 - Skills.pdf",
    "S4S": "STAR 4 - Skills.pdf",
    "S5S": "STAR 5 - Skills.pdf",
    "S6S": "STAR 6 - Skills.pdf",
    "S7S": "STAR 7 - Skills.pdf",
    "S8S": "STAR 8 - Skills.pdf",
    "S9S": "STAR 9 - Skills.pdf",
    "S10S": "STAR 10 - Skills.pdf",
    "GS": "GOLD - Skills.pdf",
    "S5A": "STAR 5 - Artistic.pdf",
    "S7A": "STAR 7 - Artistic.pdf",
    "S9A": "STAR 9 - Artistic.pdf",
    "GA": "GOLD - Artistic.pdf",
    "S1FS": "Freeskate Elements - STAR 1.pdf",
    "S2FSE": "Freeskate Elements - STAR 2.pdf",
    "S2FSP": "STAR 2 - FS Program.pdf",
    "S3FSE": "Freeskate Elements - STAR 3.pdf",
    "S3FSP": "STAR 3 - FS Program.pdf",
    "S4FSE": "Freeskate Elements - STAR 4.pdf",
    "S4FSP": "STAR 4 - FS Program.pdf",
    "S5FSE": "Freeskate Elements - STAR 5.pdf",
    "S5FSP": "STAR 5 - FS Program.pdf",
    "S6FSE": "Freeskate Elements - STAR 6.pdf",
    "S6FSP": "STAR 6 - FS Program.pdf",
    "S7FSE": "Freeskate Elements - STAR 7.pdf",
    "S7FSP": "STAR 7 - FS Program.pdf",
    "S8FSE": "Freeskate Elements - STAR 8.pdf",
    "S8FSP": "STAR 8 - FS Program.pdf",
    "S9FSE": "Freeskate Elements - STAR 9.pdf",
    "S9FSP": "STAR 9 - FS Program.pdf",
    "S10FSE": "Freeskate Elements - STAR 10.pdf",
    "S10FSE-CH": "Freeskate Elements - STAR 10.pdf",
    "S10FSP": "STAR 10 - FS Program.pdf",
    "GFSP": "STAR GOLD - FS Program.pdf",
    "GFSP-CH": "STAR GOLD - FS Program.pdf",
    "SYS2": "STAR 2 - Synchro Element Assessment EN.pdf",
    "SYS3": "STAR 3 - Synchro Element Assessment EN.pdf",
    "SYS4": "STAR 4 - Synchro Element Assessment EN.pdf"
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
        document.querySelector("#verifyDataWarning").classList.add("d-none");
        document.querySelector("#verifyDataError").classList.add("d-none");
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
            const validLeadValueForTestCode = ((entry.lead === "" && !isDance(entry.test_code)) || (isDance(entry.test_code) && entry.lead !== ""));
            const validResult = ["", "P", "H", "R", "W"].includes(entry.result);
            const entryError = !(entry.result in resultBadgeHTML && validTestCode && validLeadValue && validLeadValueForTestCode && validResult);

            const formFieldsEmpty = (entry.id && entry["date(dd/mm/yyyy)"] && entry.name && entry.sc_num && entry.assessor_name && entry.assessor_sc_num && entry.home_org && entry.home_org_sc_num) === "" || idSet.has(entry.id);
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

function isDance(testCode) {
    return testSheetFileNameByCode[testCode]?.includes("Dance") || testSheetFileNameByCode[`${testCode}-L`]?.includes("Dance") || testSheetFileNameByCode[`${testCode}-F`]?.includes("Dance");
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
        else if (lead === "false" || lead == "FALSE") {
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
        const currentPageNumber = (i + 10) / 10
        const testSummarySheet = await generateTestSummarySheet(currentPageNumber, entriesForTestSummarySheet, normal_test_fee, currentPageNumber, totalPages,
            title, org_name, org_sc_num, assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email)
        const copiedTestSummarySheetPages = await combinedTestSummarySheets.copyPages(testSummarySheet, [0])
        for (const page of copiedTestSummarySheetPages) {
            combinedTestSummarySheets.addPage(page)
        }
    }

    for (let i = 0; i < challengeTests.length; i += entriesPerPage) {
        const entriesForTestSummarySheet = challengeTests.slice(i, i + entriesPerPage)
        const currentPageNumber = (totalPagesNormalTests * 10 + i + 10) / 10
        const testSummarySheet = await generateTestSummarySheet(currentPageNumber, entriesForTestSummarySheet, challenge_test_fee, currentPageNumber, totalPages,
            title, org_name, org_sc_num, assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email)
        const copiedTestSummarySheetPages = await combinedTestSummarySheets.copyPages(testSummarySheet, [0])
        for (const page of copiedTestSummarySheetPages) {
            combinedTestSummarySheets.addPage(page)
        }
    }

    for (let i = 0; i < challengeTests.length; i += entriesPerPage) {
        const entriesForTestSummarySheet = challengeTests.slice(i, i + entriesPerPage)
        const currentPageID = (totalPagesNormalTests * 10 + totalPagesChallengeTests * 10 + i + 10) / 10
        const currentPageNumber = (i + 10) / 10
        const testSummarySheet = await generateTestSummarySheet(currentPageID, entriesForTestSummarySheet, challenge_test_fee, currentPageNumber, totalPagesChallengeTests,
            "**Skate Canada Copy**", org_name, org_sc_num, assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email, false)
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

async function generateTestSummarySheet(page_id, entries, test_fee, page_num, total_pages, title, org_name, org_sc_num,
    assessment_coordinator_name, assessment_coordinator_sc_num, assessment_coordinator_phone, assessment_coordinator_email, add_test_id = true) {

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
        accessmentSummarySheetForm.getTextField(`untitled${(testCount % 10) + 88}`).setText(test_code + (add_test_id ? ` (#${id})` : ""))
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
        field.acroField.dict.set(PDFName.of("T"), PDFString.of(`${page_id}_${field.getName()}`))
    });

    return accessmentSummarySheetPDF;
};