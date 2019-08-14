import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dynamic-form-table',
  templateUrl: './dynamic-form-table.component.html',
  styleUrls: ['./dynamic-form-table.component.sass']
})
export class DynamicFormTableComponent implements OnInit {

  formBuilder: FormBuilder;
  rootForm: FormGroup;
  dummyRowData:Array<RowDataTemplate> = [
    {
      idtSequence: 'dummy data 1',
      probUsed: 'prob data 1',
      idtName: 'idt data 1',
      variant: 'variant data 1',
      internalId: 'internalid data 1',
      assignedNo: 'ass num dat 1a'
    },
    {
      idtSequence: 'dummy data 2',
      probUsed: 'prob data 2 eeee',
      idtName: 'idt data 2',
      variant: 'variant data 2',
      internalId: 'int id data 2',
      assignedNo: 'ass num data 2'
    },
    {
      idtSequence: 'dummy data 3',
      probUsed: 'prob data 3',
      idtName: 'idt data 3',
      variant: 'variant data 3',
      internalId: 'int id data 3',
      assignedNo: 'ass num dat 3a'
    }
  ];

  constructor() {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.loadInitialDataTobeUsedInThisComponent();


    //Instead of looping an already exisitng aray, 
    //a button click can also be used to create a new empty row


    //Iterate through the array
    this.dummyRowData.forEach(row => {
      let createdFormGroup = this.createNewRowForm(row);

      //using dummyRowData to populate the formarray
      (<FormArray>this.rootForm.get('tableRowData')).push(createdFormGroup);
    });
  }


  /**
   * Loads all the initial data to be supplied
   * for initializing this component
   * 
   * 1) Initialize the rootForm with the following:
   *    
   *    a) a formControl 'something' as a dummy data
   *    b) formArray 'tableRowData' which we are going to use here
   */
  loadInitialDataTobeUsedInThisComponent() {

    this.rootForm = this.formBuilder.group({
      something: this.formBuilder.control('something dummy'),
      tableRowData: this.formBuilder.array([])
    });
  }

  /**
   * Returns a formGroup with initialized
   * formControls corresponding to 
   * data of each row of table.
   * 
   * Use this method to initialize row data:
   *  
   *   1) pass in values to create the populated rows or use it as an empty initializer
   *   2) use Validators as and when required
   */
  createNewRowForm(param: RowDataTemplate): FormGroup {
    return this.formBuilder.group({
      idtSequence: this.formBuilder.control(param.idtSequence),
      probUsed: this.formBuilder.control(param.probUsed),
      idtName: this.formBuilder.control(param.idtName),
      variant: this.formBuilder.control(param.variant),
      internalId: this.formBuilder.control(param.internalId),
      assignedNo: this.formBuilder.control(param.assignedNo)
    });
  }

}

/**
 * Interface for the row model
 */
interface RowDataTemplate {
  idtSequence?: string;
  probUsed?: string;
  idtName?: string;
  variant?: string;
  internalId?: string;
  assignedNo?: string;
}
