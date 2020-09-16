/**
 * An identifiable element.
 */
export abstract class AbstractEntity {

  public abstract id: number | string;
  public name?: string;
  public description?: string;
}
