import { test, expect } from '@playwright/test';
import exp from 'constants';

test.beforeEach( async({page}) => {
  await page.goto('/')
})
// Select the PET TYPES menu item in the navigation bar
test('Test Case 1: Update pet type', async ({page}) => {
  await page.click('span:has-text("Pet Types")')

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  
  const PetTypes = page.locator('//h2[contains(text(), "Pet Types")][1]')
  await expect(PetTypes).toBeVisible()

// 3. Click on "Edit" button for the "cat" pet type

  page.locator('[class="form-control ng-pristine ng-valid ng-touched"]')
  await page.getByRole('button', { name: "Edit" }).first().click()

// 4. Add assertion of the "Edit Pet Type" text displayed

  const EditPetType = page.locator(':text-is("Edit Pet Type")')
  await expect(EditPetType).toBeVisible()

// 5. Change the pet type name from "cat" to "rabbit" and click "Update" button

  const Name = page.locator(':text-is("Name")')
  await expect(Name).toBeVisible()
  const inputFieldSelector = '#name';
  await page.fill(inputFieldSelector, 'rabbit');
  await page.getByRole('button', {name: "Update"}).click() 

// 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 

  const FirstPetType = await page.locator('input[name="pettype_name"]').nth(0).inputValue()
  expect(FirstPetType).toBe('rabbit')

// 7. Click on "Edit" button for the same "rabbit" pet type

  await page.locator('button:has-text("Edit")').first().click()

// 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button

  const Name2 = page.locator(':text-is("Name")')
  await expect(Name2).toBeVisible()
  const inputFieldSelector2 = '#name';
  await page.fill(inputFieldSelector2, 'cat');
  await page.getByRole('button', {name: "Update"}).click() 

// 9. Add the assertion that the first pet type in the list of names has a value "cat" 
  
  const FirstPetType2 = await page.locator('input[name="pettype_name"]').nth(0).inputValue()
  expect(FirstPetType2).toBe('cat')
  

});
