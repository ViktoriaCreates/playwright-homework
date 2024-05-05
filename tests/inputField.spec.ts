import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})
// 1. Select the PET TYPES menu item in the navigation bar

test('Test Case 1: Update pet type', async ({page}) => {
  await page.click(':text-is("Pet Types")')

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  
// Below 1st line is working, however I tried to simplify code, and created a shorter version.
// const PetTypes = page.locator('//h2[contains(text(), "Pet Types")][1]')

  const PetTypes = page.locator('h2:has-text("Pet Types")')
  await expect(PetTypes).toBeVisible()

// The ">" I did not find by myself. Is it reliable to use in the code?

  const PetTypesList = page.locator('#pettypes tbody > tr') 
  await expect(PetTypesList).toHaveCount(6)

// I did not find another solution which will return list of all pet types. 
// These are what I found. Also, when placing ',' it finds more elements.
// const PetTypesList = page.locator('table, #pettypes, thead, tr, tbody') = 10
// const PetTypesList = page.locator('tr') = 7
// const PetTypesList = page.locator('table') = 1
// const PetTypesList = page.locator('tbody, tr') = 8
// const PetTypesList = page.locator('thead') = 1

// 3. Click on "Edit" button for the "cat" pet type

  page.locator('[class="form-control ng-pristine ng-valid ng-touched"]')
  await page.getByRole('button', { name: "Edit" }).first().click()

// 4. Add assertion of the "Edit Pet Type" text displayed

  const EditPetType = page.locator(':text-is("Edit Pet Type")')
  await expect(EditPetType).toBeVisible()

// 5. Change the pet type name from "cat" to "rabbit" and click "Update" button

  const Name = page.locator(':text-is("Name")')
  await expect(Name).toBeVisible()
  const InputFieldSelector = page.locator('#name')
  await expect(InputFieldSelector).toHaveValue('cat')
  await InputFieldSelector.fill('rabbit')
  await page.getByRole('button', {name: "Update"}).click() 

// 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 

  const FirstPetType2 = await page.locator('input[name="pettype_name"]').nth(0).inputValue()
  expect(FirstPetType2).toBe('rabbit')

// 7. Click on "Edit" button for the same "rabbit" pet type

  await page.locator('button:has-text("Edit")').first().click()

// 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button

  const ChangeName = page.locator(':text-is("Name")')
  await expect(ChangeName).toBeVisible()
  await expect(InputFieldSelector).toHaveValue('rabbit')
  const InputFieldSelector2 = '#name'
  await page.fill(InputFieldSelector2, 'cat')
  await page.getByRole('button', {name: "Update"}).click() 

// 9. Add the assertion that the first pet type in the list of names has a value "cat" 
  
  const FirstPetType1 = await page.locator('input[name="pettype_name"]').nth(0).inputValue()
  expect(FirstPetType1).toBe('cat')
  
});

// 1. Select the PET TYPES menu item in the navigation bar

test('Test Case 2: Cancel pet type update', async ({page}) => {
  await page.click(':text-is("Pet Types")')

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types

  const PetTypes = page.locator('h2:has-text("Pet Types")')
  await expect(PetTypes).toBeVisible()
  const PetTypesList = page.locator('#pettypes tbody > tr') 
  await expect(PetTypesList).toHaveCount(6)

// 3. Click on "Edit" button for the "dog" pet type

  page.locator('[class="form-control ng-untouched ng-pristine ng-valid"]')
  await page.getByRole('button', { name: "Edit" }).nth(1).click()

// 4. Type the new pet type name "moose"
  
  const Name = page.locator(':text-is("Name")')
  await expect(Name).toBeVisible()
  const InputFieldSelector = page.locator('#name')
  await expect(InputFieldSelector).toHaveValue('dog')
  await InputFieldSelector.fill('moose') 

// 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page

  const EditPetType = page.locator(':text-is("Edit Pet Type")')
  await expect(EditPetType).toBeVisible()
  const InputFieldSelector3 = page.locator('#name')
  await expect(InputFieldSelector3).toHaveValue('moose')

// 6. Click on "Cancel" button

  await page.getByRole('button', {name: "Cancel"}).click() 

// 7. Add the assertion the value "dog" is still displayed in the list of pet types
  const SecondPetType = await page.locator('input[name="pettype_name"]').nth(1).inputValue()
  expect(SecondPetType).toBe('dog')

});

// 1. Select the PET TYPES menu item in the navigation bar

test('Test Case 3: Pet type name is required validation', async ({page}) => {
  await page.click(':text-is("Pet Types")')

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types

  const PetTypes = page.locator('h2:has-text("Pet Types")')
  await expect(PetTypes).toBeVisible()
  const PetTypesList = page.locator('#pettypes tbody > tr') 
  await expect(PetTypesList).toHaveCount(6)

// 3. Click on "Edit" button for the "lizard" pet type

  page.locator('[class="form-control ng-untouched ng-pristine ng-valid"]')
  await page.getByRole('button', { name: "Edit" }).nth(2).click()

// 4. On the Edit Pet Type page, clear the input field

  const EditPetType = page.locator(':text-is("Edit Pet Type")')
  await expect(EditPetType).toBeVisible()
  const Name = page.locator(':text-is("Name")')
  await expect(Name).toBeVisible()
  const InputFieldSelector = page.locator('#name')
  await expect(InputFieldSelector).toHaveValue('lizard')
  await InputFieldSelector.clear()

// 5. Add the assertion for the "Name is required" message below the input field

  const NameIsRequired = page.locator(':text-is("Name is required")')
  await expect(NameIsRequired).toBeVisible()

// 6. Click on "Update" button

  await page.getByRole('button', {name: "Update"}).click()

// 7. Add assertion that "Edit Pet Type" page is still displayed

  const EditPetTypeIsDisplayed = page.locator(':text-is("Edit Pet Type")')
  await expect(EditPetTypeIsDisplayed).toBeVisible() 

// 8. Click on the "Cancel" button

  await page.getByRole('button', {name: "Cancel"}).click() 

// 9. Add assertion that "Pet Types" page is displayed

  const PetTypesPageIsDisplayed = page.locator('h2:has-text("Pet Types")')
  await expect(PetTypesPageIsDisplayed).toBeVisible()
  
});