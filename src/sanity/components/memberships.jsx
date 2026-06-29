import { Stack, Box, Card, Grid, Text, Tooltip, MenuButton, Menu } from '@sanity/ui';
import { useRenderers } from '../utils/renderers';

export const Memberships = (props) => {
  const {
    value,
    onChange,
    members = [],
    elementProps,
  } = props;

  const { renderRateField, renderTextField, renderTextAreaField, renderButton, errorMessages } = useRenderers({
    value,
    onChange,
    members,
  });

  return (
    <Stack className="rate-stack rate-stack-memberships">
      <span tabIndex={-1} {...elementProps} style={{ outline: 'none', display: 'block', height: 0 }} />
      <Card>
        <Stack>
          {/* Validation Error Display (Above Grid) */}
          {errorMessages.length > 0 && (
            <Card padding={3} radius={2} tone="critical" shadow={1} border>
              <Stack space={2}>
                <Text weight="bold" size={1}>
                  Please correct the following errors:
                </Text>
                {errorMessages.map((msg, i) => (
                  <Text key={i} size={1}>
                    {msg}
                  </Text>
                ))}
              </Stack>
            </Card>
          )}

          {/* HEADING */}
          <Card>
            <Stack>
              <Text weight="medium" size={1} style={{ paddingTop: '.75rem', paddingBottom: '1.3rem' }}>
                Heading
              </Text>
              {renderTextField('membershipsHeading', '', '3')}
            </Stack>
          </Card>

          {/* DESCRIPTION */}
          <Card style={{ paddingBottom: '3rem' }}>
            <Stack>
              <Text weight="medium" size={1} style={{ paddingTop: '4rem', paddingBottom: '1.3rem' }}>
                Description
              </Text>
              {renderTextAreaField('membershipsDescription','large-text-area')}
            </Stack>
          </Card>

          {/* Your Grid Layout */}
          <Grid columns={3} gap={1} style={{ alignItems: 'center' }}>
            {/* --- Header Row --- */}
            <Card>
              <Text></Text>
            </Card>
            <Card padding={3}>
              <Text weight="semibold" style={{ textAlign: 'center' }} className="th">
                Monthly
              </Text>
            </Card>
            <Card padding={3}>
              <Text weight="semibold" style={{ textAlign: 'center' }} className="th">
                Yearly
              </Text>
            </Card>

            {/* --- Row 1 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('juniorTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('juniorTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('juniorMonthly')}</Card>
            <Card>{renderRateField('juniorYearly')}</Card>

            {/* --- Row 2 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('individualTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('individualTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('individualMonthly')}</Card>
            <Card>{renderRateField('individualYearly')}</Card>

            {/* --- Row 3 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('premiumIndividualTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('premiumIndividualTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('premiumIndividualMonthly')}</Card>
            <Card>{renderRateField('premiumIndividualYearly')}</Card>

            {/* --- Row 4 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('seniorTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('seniorTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('seniorMonthly')}</Card>
            <Card>{renderRateField('seniorYearly')}</Card>
            {/* --- Row 5 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('premiumSeniorTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('premiumSeniorTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('premiumSeniorMonthly')}</Card>
            <Card>{renderRateField('premiumSeniorYearly')}</Card>
            {/* --- Row 6 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('familyTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('familyTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('familyMonthly')}</Card>
            <Card>{renderRateField('familyYearly')}</Card>
            {/* --- Row 7 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('premiumFamilyTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('premiumFamilyTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('premiumFamilyMonthly')}</Card>
            <Card>{renderRateField('premiumFamilyYearly')}</Card>
            {/* --- Row 8 --- */}
            <Card className="firstCellCard" style={{ paddingLeft: '0px' }}>
              {renderTextField('corporateTitle', 'firstCell', '3', { paddingLeft: '0px', fontWeight: '600' })}

              <Tooltip
                content={
                  <Box padding={1}>
                    <Text size={1}>Edit definition</Text>
                  </Box>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal>
                <span>
                  <MenuButton
                    button={renderButton()}
                    id="menu-button-example"
                    menu={<Menu>{renderTextField('corporateTitleDef', 'firstCellButton', '3')}</Menu>}
                    popover={{ portal: false, placement: 'bottom' }}
                  />
                </span>
              </Tooltip>
            </Card>
            <Card>{renderRateField('corporateMonthly')}</Card>
            <Card>{renderRateField('corporateYearly')}</Card>

            
          </Grid>
        </Stack>
      </Card>
    </Stack>
  );
};
