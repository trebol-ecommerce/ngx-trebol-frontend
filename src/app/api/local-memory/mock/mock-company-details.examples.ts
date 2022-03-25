/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CompanyDetails } from 'src/models/CompanyDetails';

export const MOCK_COMPANY_DETAILS: CompanyDetails = {
  name: $localize`:Example of a company or business name:Some company or business name`,
  description: $localize`:Example of a paragraph used to describe the business this application is meant for:This paragraph should describe your business profile, motivation, goals, success stories, whatever helps build an image.`,
  bannerImageURL: 'https://fakeimg.pl/600x200',
  logoImageURL: 'https://fakeimg.pl/400x400'
};
