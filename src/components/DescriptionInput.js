import React from "react";
import { renderKr } from "../utils";
import EasyEdit, { Types } from "react-easy-edit";

export default function DescriptionInput({ onChangeInput, input }) {
  const save = (value, prop, isNumber) => {
    if (isNumber) {
      onChangeInput(prop, value);
    } else {
      onChangeInput(
        prop,
        Number(value.toString().replace(".", "").replace(",", "."))
      );
    }
  };
  const cancel = () => {};
  const generateOptionsList = () => {
    return [
      { label: "Lav", value: 1 },
      { label: "Middel", value: 2 },
      { label: "Høj", value: 3 },
    ];
  };
  const SAVE_TEXT = "Gem";
  const UNDO_TEXT = "Fortryd";
  const PLACEHOLDER = "";
  const NOT_VALID_MESSAGE =
    "Den valgte værdi er ikke valid. Vælg venligst en anden værdi.";
  return (
    <div>
      <div className="section">
        <h2>I dag</h2>
        <div className="paragraph">
          Jeg er{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) =>
              save(Math.round(Number(v.replace(",", "."))), "age", true)
            }
            value={input.age.toString()}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              if (value < 0 || value > 80) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />
          {"  "}
          år. Min løn er{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) => save(v, "salary_before_tax")}
            value={renderKr(input.salary_before_tax)}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              if (value < 0) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />{" "}
          kr. per måned før skat, og jeg har opsparet{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) => save(v, "current_pension")}
            value={renderKr(input.current_pension)}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              if (value < 0) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />{" "}
          kr. i pension. Jeg er villig til at indbetale{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) => save(Number(v), "pension_saving_rate", true)}
            value={input.pension_saving_rate}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              if (value < 0 || value > 100) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />{" "}
          % af min løn i pension, og har{" "}
          <EasyEdit
            type={Types.SELECT}
            options={generateOptionsList()}
            onSave={(v) => save(v, "pension_investment_risk")}
            value={input.pension_investment_risk}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={"Vælg"}
          />{" "}
          risikoprofil.
        </div>
      </div>
      <div className="section">
        <h2>På pension</h2>
        <div className="paragraph">
          Jeg går på pension når jeg fylder{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) =>
              save(Math.round(Number(v.replace(",", "."))), "pension_age", true)
            }
            value={input.pension_age.toString()}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              if (value < input.age || value > 99) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />
          {"  "}
          år. Jeg vil have{" "}
          <EasyEdit
            type={Types.TEXT}
            onSave={(v) => {
              console.log("VV", v, Number(v.toString().replace(".", "")));
              save(
                input.salary_before_tax === 0
                  ? 1
                  : (Number(v.toString().replace(".", "")) /
                      input.salary_before_tax) *
                      100,
                "payout_as_procentage_of_salary",
                true
              );
            }}
            value={renderKr(
              (input.payout_as_procentage_of_salary / 100) *
                input.salary_before_tax
            )}
            onCancel={cancel}
            saveButtonLabel={SAVE_TEXT}
            cancelButtonLabel={UNDO_TEXT}
            placeholder={PLACEHOLDER}
            onValidate={(value) => {
              const v = Number(value.toString().replace(".", ""));
              const calc =
                input.salary_before_tax === 0
                  ? 1
                  : (v / input.salary_before_tax) * 100;
              console.log("com", v, input.salary_before_tax);
              if (v < 2 || calc < 1 || v > input.salary_before_tax) {
                return false;
              }
              return true;
            }}
            validationMessage={NOT_VALID_MESSAGE}
          />{" "}
          kr. per måned før skat, udbetalt som supplement til min folkepension.
          Min opsparing vil række til jeg er bliver 100 år.
        </div>
      </div>
      <div className="section">
        <h2>Vigtige overvejelser</h2>
        <div className="paragraph">
          Overvej hvad der vil fungere bedst for dig: at spare mere nu eller at
          forbruge mindre når du bliver pensioneret.
        </div>
      </div>
      <div className="section">
        <h2>Neway</h2>
        <div className="paragraph">
          Ønsker du et bedre overblik over din pension og uvildig vurdering af
          dine muligheder? Med en Neway profil får du et overblik over din
          økonomi så du kan få bedre rådgivning. Det er 100% gratis at have en
          profil og du kan slette den til enhver tid.
        </div>
      </div>
      <button
        className="primary"
        onClick={() => (window.location.href = "https://neway.dk")}
      >
        Opret en Neway profil
      </button>
    </div>
  );
}
