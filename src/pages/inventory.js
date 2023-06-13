import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { InventoriesTable } from 'src/sections/inventory/inventories-table';
import { InventoriesSearch } from 'src/sections/inventory/inventories-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();


const data=[{
  "business": {
    "business_core": "CM LLC",
    "business_division": "M&A",
    "business_id": 5,
    "entity_key": null,
    "is_active": true,
    "replaced_by": null,
    "sort": null
  },
  "cycle": {
    "cycle_id": 9,
    "effective_date": "2022-12-31",
    "entity_key": "Q1 2023",
    "lock_date": null,
    "tag_1": "Q1 2023"
  },
  "horizon": {
    "display": "test2",
    "entity_key": "test",
    "horizon_id": 1,
    "is_active": true,
    "sort": 0
  },
  "is_material": null,
  "item_description": "The risk of BC short term ratings downgrade due to a change in the hold nce sheet which affects competitiveness.",
  "legacy_key": 31834,
  "likelihood": null,
  "risk_item_cycle_id": 5621,
  "risk_item_id": 509,
  "risk_type": {
    "entity_key": null,
    "is_active": true,
    "Level_four": "",
    "Level_one": "Liquidity_and_Funding",
    "level_three": "Rating_Downgrade",
    "Level_two": "Funding Liability",
    "replaced_by": null,
    "risk_ type_id": 285
  },
  "severity": {
    "display": "$5 - $30MM",
    "entity_key": "5_30MM",
    "is _active": true,
    "severity_id": 3,
    "sort": 0
  }
}]


const useInventories = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useRiskIds = (inventories) => {
  return useMemo(
    () => {
      return inventories.map((inventory) => inventory.risk_item_id);
    },
    [inventories]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const inventories = useInventories(page, rowsPerPage);
  const riskIds = useRiskIds(inventories);
  const inventorySelection = useSelection(riskIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
       Inventory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                 Inventory
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <InventoriesSearch />
            <InventoriesTable
              count={data.length}
              items={inventories}
              onDeselectAll={inventorySelection.handleDeselectAll}
              onDeselectOne={inventorySelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={inventorySelection.handleSelectAll}
              onSelectOne={inventorySelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={inventorySelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
