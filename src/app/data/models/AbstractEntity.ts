// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * An identifiable element.
 */
export abstract class AbstractEntity {

  public abstract id: number | string;
  public name?: string;
  public description?: string;
}
