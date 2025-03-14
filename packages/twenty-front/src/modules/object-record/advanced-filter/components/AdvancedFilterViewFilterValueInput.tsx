import { ObjectFilterDropdownFilterInput } from '@/object-record/object-filter-dropdown/components/ObjectFilterDropdownFilterInput';
import { fieldMetadataItemIdUsedInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/fieldMetadataItemIdUsedInDropdownComponentState';
import { selectedFilterComponentState } from '@/object-record/object-filter-dropdown/states/selectedFilterComponentState';
import { selectedOperandInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/selectedOperandInDropdownComponentState';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { SelectControl } from '@/ui/input/components/SelectControl';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useSetRecoilComponentStateV2 } from '@/ui/utilities/state/component-state/hooks/useSetRecoilComponentStateV2';

type AdvancedFilterViewFilterValueInputProps = {
  viewFilterId: string;
};

export const AdvancedFilterViewFilterValueInput = ({
  viewFilterId,
}: AdvancedFilterViewFilterValueInputProps) => {
  const dropdownId = `advanced-filter-view-filter-value-input-${viewFilterId}`;

  const currentRecordFilters = useRecoilComponentValueV2(
    currentRecordFiltersComponentState,
  );

  const filter = currentRecordFilters.find(
    (recordFilter) => recordFilter.id === viewFilterId,
  );

  const isDisabled = !filter?.fieldMetadataId || !filter.operand;

  const setFieldMetadataItemIdUsedInDropdown = useSetRecoilComponentStateV2(
    fieldMetadataItemIdUsedInDropdownComponentState,
  );

  const setSelectedOperandInDropdown = useSetRecoilComponentStateV2(
    selectedOperandInDropdownComponentState,
  );

  const setSelectedFilter = useSetRecoilComponentStateV2(
    selectedFilterComponentState,
  );

  if (isDisabled) {
    return (
      <SelectControl
        isDisabled
        selectedOption={{
          label: filter?.displayValue ?? '',
          value: null,
        }}
      />
    );
  }

  return (
    <Dropdown
      dropdownId={dropdownId}
      clickableComponent={
        <SelectControl
          selectedOption={{
            label: filter?.displayValue ?? '',
            value: null,
          }}
        />
      }
      onOpen={() => {
        setFieldMetadataItemIdUsedInDropdown(filter.fieldMetadataId);
        setSelectedOperandInDropdown(filter.operand);
        setSelectedFilter(filter);
      }}
      dropdownComponents={
        <DropdownMenuItemsContainer>
          <ObjectFilterDropdownFilterInput />
        </DropdownMenuItemsContainer>
      }
      dropdownHotkeyScope={{ scope: dropdownId }}
      dropdownOffset={{ y: 8, x: 0 }}
      dropdownPlacement="bottom-start"
      dropdownMenuWidth={280}
    />
  );
};
